import { Redis } from '@upstash/redis';

const hasRedis =
	!!Deno.env.get('UPSTASH_REDIS_REST_URL') && !!Deno.env.get('UPSTASH_REDIS_REST_TOKEN');

const redis = hasRedis ? Redis.fromEnv() : null;

export { redis, hasRedis };
