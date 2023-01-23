import { createClient } from "redis";
import { REDIS_URL } from '$env/static/private';

const client = createClient({ url: REDIS_URL });

client.on('error', error => console.error('ERR:REDIS:', error));
client.connect();

export const query = async (q: string) => await client.graph.query('test-graphs', q);
