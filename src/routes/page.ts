import type { PageLoad } from './$types';

export const load = (async ({ fetch }) => {

    const query = `query queryTask { queryTask { id title completed } }`;

    return await fetch('/graphql', {
        method: 'POST',
        body: JSON.stringify({ query })
    }).then((res) => res.json());

}) satisfies PageLoad;

