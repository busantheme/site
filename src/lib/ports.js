import { join } from 'npm:path'; // Using npm:path for consistency with other npm imports
import { redis, hasRedis } from '$lib/redis.js';

<<<<<<< HEAD
/** @typedef {import('$lib/types').PortRecord} PortRecord */
/** @typedef {import('$lib/types').PortInput} PortInput */

const DATA_FILE = join(process.cwd(), 'data', 'ports.json');
/** @type {PortRecord[]} */
=======
const DATA_FILE = join(Deno.cwd(), 'data', 'ports.json');
>>>>>>> c0e4d4d3006931a353e38b8374c25b2ffac16199
const DEFAULT_PORTS = [
    { id: 1, name: 'Night', url: 'https://example.com/night' },
    { id: 2, name: 'Light', url: 'https://example.com/light' }
];

const isVercel = !!Deno.env.get('VERCEL');

/** @type {PortRecord[] | null} */
let memoryPorts = null;

async function ensureDataDir() {
<<<<<<< HEAD
    const dataDir = join(process.cwd(), 'data');
    try {
        if (!existsSync(dataDir)) {
            await mkdir(dataDir, { recursive: true });
        }
    } catch (error) {
        console.error('failed to ensure data dir', error);
    }
=======
	const dataDir = join(Deno.cwd(), 'data');
	try {
		const stat = await Deno.stat(dataDir);
		if (!stat.isDirectory) {
			await Deno.mkdir(dataDir, { recursive: true });
		}
	} catch (e) {
		if (e instanceof Deno.errors.NotFound) {
			await Deno.mkdir(dataDir, { recursive: true });
		} else {
			throw e;
		}
	}
}

async function fileExists(path) {
	try {
		await Deno.stat(path);
		return true;
	} catch (e) {
		if (e instanceof Deno.errors.NotFound) {
			return false;
		}
		throw e;
	}
>>>>>>> c0e4d4d3006931a353e38b8374c25b2ffac16199
}

/**
 * @returns {Promise<Array<PortRecord>>}
 */
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

<<<<<<< HEAD
    if (!isVercel) {
        await ensureDataDir();
        try {
            if (existsSync(DATA_FILE)) {
                const raw = await readFile(DATA_FILE, 'utf-8');
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) return parsed;
            }
        } catch (error) {
            console.error('file load failed', error);
        }
    }
=======
	if (!isVercel) {
		await ensureDataDir();
		try {
			if (await fileExists(DATA_FILE)) {
				const raw = await Deno.readTextFile(DATA_FILE);
				const parsed = JSON.parse(raw);
				if (Array.isArray(parsed)) return parsed;
			}
		} catch (e) {}
	}
>>>>>>> c0e4d4d3006931a353e38b8374c25b2ffac16199

    if (!memoryPorts) {
        memoryPorts = DEFAULT_PORTS.slice();
    }
    return memoryPorts;
}

/**
 * @param {Array<PortRecord>} ports
 */
async function savePorts(ports) {
    if (hasRedis && redis) {
        try {
            await redis.set('ports', JSON.stringify(ports));
            return;
        } catch (error) {
            console.error('redis save failed', error);
        }
    }

<<<<<<< HEAD
    if (!isVercel) {
        await ensureDataDir();
        try {
            await writeFile(DATA_FILE, JSON.stringify(ports, null, 2));
            return;
        } catch (error) {
            console.error('file save failed', error);
        }
    }
=======
	if (!isVercel) {
		try {
			await ensureDataDir();
			await Deno.writeTextFile(DATA_FILE, JSON.stringify(ports, null, 2));
			return;
		} catch (e) {}
	}
>>>>>>> c0e4d4d3006931a353e38b8374c25b2ffac16199

    memoryPorts = ports;
}

export async function getPorts() {
    return await loadPorts();
}

/**
 * @param {PortInput} port
 */
export async function addPort(port) {
    const ports = await loadPorts();
    const newId = Math.max(0, ...ports.map((p) => Number(p.id) || 0)) + 1;
    const newPort = { id: newId, ...port };
    ports.push(newPort);
    await savePorts(ports);
    return newPort;
}

/**
 * @param {number | string} id
 */
export async function deletePort(id) {
    const ports = await loadPorts();
    const numericId = Number(id);
    const filtered = ports.filter((p) => Number(p.id) !== numericId);
    await savePorts(filtered);
    return filtered;
}
