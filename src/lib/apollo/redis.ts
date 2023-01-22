import { createClient } from "redis";
import { REDIS_URL } from '$env/static/private';

const client = createClient({ url: REDIS_URL });
await client.connect();

export const query = async (q: string) => await client.graph.query('code-build', q);