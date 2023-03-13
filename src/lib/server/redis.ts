import { createClient } from "redis";
import { REDIS_URL } from '$env/static/private';
import { browser } from "$app/environment";

const client = createClient({ url: REDIS_URL });

client.on('error', error => console.error('ERR:REDIS:', error));
client.connect();

export const query = async (q: string) => await client.graph.query('test-graphs', q);

if (browser) {
    console.log("huh");
}
