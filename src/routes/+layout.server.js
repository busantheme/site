import { loadTheme } from '$lib/theme.js';
import { redis, hasRedis } from '$lib/redis.js';

export async function load({ cookies }) {
    const theme = loadTheme();
    
    let sessionId = cookies.get('session_id');
    if (!sessionId) {
        sessionId = crypto.randomUUID();
        cookies.set('session_id', sessionId, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    }

    let preferences = { language: 'ko', theme: 'night' };
    
    if (hasRedis && redis) {
        try {
            const saved = await redis.get(`user:${sessionId}:prefs`);
            if (saved) {
                const parsed = typeof saved === 'string' ? JSON.parse(saved) : saved;
                preferences = { ...preferences, ...parsed };
            }
        } catch (e) {
            console.log('Redis not available');
        }
    }

    return { theme, preferences, sessionId };
}
