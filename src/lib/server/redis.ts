import { createClient } from "redis";
import { REDIS_URL } from '$env/static/private';
import { setMaxListeners } from 'events';

const client = createClient({ url: REDIS_URL });

setMaxListeners(0);

client.on('error', error => console.error('ERR:REDIS:', error));
client.connect();

export const query = async (q: string) => await client.graph.query('test-graphs', q);

