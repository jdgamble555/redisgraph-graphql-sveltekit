import type { RequestHandler } from './$types';
import { ApolloServer } from '@apollo/server';
import { error } from '@sveltejs/kit';
import { typeDefs } from '$lib/apollo/schema';
import { resolvers } from '$lib/apollo/resolvers';


export const POST = (async ({ request }) => {

    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    const r = await request.json();
    const graphqlresponse = await server.executeOperation(r);

    if (graphqlresponse.body.kind === 'single') {
        const r = graphqlresponse.body.singleResult;
        return new Response(JSON.stringify(r));
    }

    throw error(404, 'Not found');

}) satisfies RequestHandler;