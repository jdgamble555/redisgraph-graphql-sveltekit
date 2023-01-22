import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {
    const res = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `
            query GetBooks {
              books {
               title
               author
              }
            }
        `
        })
    });
    const r = await res.json();
    return r;
}) satisfies PageLoad;