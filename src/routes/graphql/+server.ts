import type { RequestHandler } from './$types';
import { ApolloServer } from '@apollo/server';
import { error } from '@sveltejs/kit';
import { typeDefs } from '$lib/server/schema';
import { resolvers } from '$lib/server/resolvers';

const server = new ApolloServer({
    typeDefs,
    resolvers
});

export const POST = (async ({ request, locals }) => {

    const session = await locals.getSession();

    const r = await request.json();
    const graphqlresponse = await server.executeOperation(r, { contextValue: session ?? '' });

    if (graphqlresponse.body.kind === 'single') {
        const r = graphqlresponse.body.singleResult;
        return new Response(JSON.stringify(r));
    }

    throw error(404, 'Not found');

}) satisfies RequestHandler;