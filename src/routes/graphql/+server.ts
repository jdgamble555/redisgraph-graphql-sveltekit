import type { RequestHandler } from './$types';
import { ApolloServer } from '@apollo/server';
import { error } from '@sveltejs/kit';

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};

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