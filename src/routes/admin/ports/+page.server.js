import { fail, redirect } from '@sveltejs/kit';
import { getPorts, addPort, deletePort } from '$lib/ports.js';
import { hasRedis } from '$lib/redis.js';

const getEnv =
    typeof Deno !== 'undefined'
        ? (key) => Deno.env.get(key)
        : (key) => process.env?.[key];

const isVercel = !!getEnv('VERCEL');

export async function load({ cookies }) {
    const session = cookies.get('admin_session');
    if (session !== 'authenticated') {
        throw redirect(302, '/admin');
    }

    if (isVercel && !hasRedis) {
        return { ports: [], redisMissing: true };
    }

    return { ports: await getPorts(), redisMissing: false };
}

export const actions = {
    add: async ({ request }) => {
        if (isVercel && !hasRedis) {
            return fail(400, { error: 'Redis not configured' });
        }
        const formData = await request.formData();
        const nameValue = formData.get('name');
        const urlValue = formData.get('url');

        if (typeof nameValue !== 'string' || typeof urlValue !== 'string') {
            return fail(400, { error: 'Name and URL are required' });
        }

        await addPort({ name: nameValue, url: urlValue });
        
        return { success: true };
    },

    delete: async ({ request }) => {
        if (isVercel && !hasRedis) {
            return fail(400, { error: 'Redis not configured' });
        }
        const formData = await request.formData();
        const idValue = formData.get('id');
        const id = typeof idValue === 'string' ? parseInt(idValue, 10) : NaN;

        if (Number.isNaN(id)) {
            return fail(400, { error: 'Invalid id' });
        }

        await deletePort(id);
        return { success: true };
    }
};
