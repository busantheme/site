import { join } from 'node:path';
import { existsSync } from 'node:fs';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import { redis, hasRedis } from '$lib/redis.js';

/** @typedef {import('$lib/types').PortRecord} PortRecord */
/** @typedef {import('$lib/types').PortInput} PortInput */

const DATA_FILE = join(process.cwd(), 'data', 'ports.json');
const DEFAULT_PORTS = [
    { id: 1, name: 'Night', url: 'https://example.com/night' },
    { id: 2, name: 'Light', url: 'https://example.com/light' }
];

const getEnv = typeof Deno !== 'undefined'
    ? (key) => Deno.env.get(key)
    : (key) => process.env?.[key];

const isVercel = !!getEnv('VERCEL');

/** @type {PortRecord[] | null} */
let memoryPorts = null;

async function ensureDataDir() {
    const dataDir = join(process.cwd(), 'data');
    if (existsSync(dataDir)) {
        return;
    }
    try {
        await mkdir(dataDir, { recursive: true });
    } catch (error) {
        console.error('failed to ensure data dir', error);
    }
}

async function loadPorts() {
    if (hasRedis && redis) {
        try {
            const value = await redis.get('ports');
            if (value) {
                const parsed = typeof value === 'string' ? JSON.parse(value) : value;
                if (Array.isArray(parsed)) return parsed;
            }
        } catch (error) {
            console.error('redis load failed', error);
        }
    }

    if (!isVercel) {
        await ensureDataDir();
        try {
            await access(DATA_FILE);
            const raw = await readFile(DATA_FILE, 'utf-8');
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) return parsed;
        } catch (error) {
            console.error('file load failed', error);
        }
    }

    if (!memoryPorts) {
        memoryPorts = DEFAULT_PORTS.slice();
    }
    return memoryPorts;
}

async function savePorts(ports) {
    if (hasRedis && redis) {
        try {
            await redis.set('ports', JSON.stringify(ports));
            return;
        } catch (error) {
            console.error('redis save failed', error);
        }
    }

    if (!isVercel) {
        await ensureDataDir();
        try {
            await writeFile(DATA_FILE, JSON.stringify(ports, null, 2), 'utf-8');
            return;
        } catch (error) {
            console.error('file save failed', error);
        }
    }

    memoryPorts = ports;
}

export async function getPorts() {
    return await loadPorts();
}

export async function addPort(port) {
    const ports = await loadPorts();
    const newId = Math.max(0, ...ports.map((p) => Number(p.id) || 0)) + 1;
    const newPort = { id: newId, ...port };
    ports.push(newPort);
    await savePorts(ports);
    return newPort;
}

export async function deletePort(id) {
    const ports = await loadPorts();
    const numericId = Number(id);
    const filtered = ports.filter((p) => Number(p.id) !== numericId);
    await savePorts(filtered);
    return filtered;
}
