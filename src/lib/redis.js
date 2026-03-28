import { Redis } from '@upstash/redis';

const getEnv = typeof Deno !== 'undefined'
	? (key) => Deno.env.get(key)
	: (key) => process.env?.[key];

const hasRedis =
	!!getEnv('UPSTASH_REDIS_REST_URL') && !!getEnv('UPSTASH_REDIS_REST_TOKEN');

const redis = hasRedis ? Redis.fromEnv() : null;

export { redis, hasRedis };
