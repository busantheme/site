import { json } from '@sveltejs/kit';
import { redis, hasRedis } from '$lib/redis.js';

export async function POST({ request, cookies }) {
	const data = await request.formData();
	const language = data.get('language');
	const theme = data.get('theme');

	let sessionId = cookies.get('session_id');
	if (!sessionId) {
		sessionId = crypto.randomUUID();
		cookies.set('session_id', sessionId, { path: '/', maxAge: 60 * 60 * 24 * 365 });
	}

	if (hasRedis && redis) {
		try {
			await redis.set(`user:${sessionId}:prefs`, JSON.stringify({ language, theme }));
		} catch (e) {
			console.log('Redis not available');
		}
	}

	return json({ success: true });
}
