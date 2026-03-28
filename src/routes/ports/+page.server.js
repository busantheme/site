import { getPorts } from '$lib/ports.js';

export async function load() {
    const ports = await getPorts();
    return { ports };
}
