/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "./db";
import type { addTodo, addUser, updateTodo, updateUser } from "./models";

export const resolvers = {
    Query: {
        queryTodo: (_: unknown, _args: unknown, context: any) => db.query('Todo', context),
        queryUser: (_: unknown, _args: unknown, context: any) => db.query('User', context)
    },
    Mutation: {
        addTodo: (_: unknown, args: { input: addTodo; }, context: any) => db.add('Todo', args.input, context),
        deleteTodo: (_: unknown, args: { input: { id: string; }; }, context: any) => db.delete('Todo', args.input, context),
        updateTodo: (_: unknown, args: { input: updateTodo; }, context: any) => db.update('Todo', args.input, context),

        // note - this app does not use these, but you would probably want to generate a uid and add the user to the db
        addUser: (_: unknown, args: { input: addUser; }) => db.add('User', args.input),
        deleteUser: (_: unknown, args: { input: { id: string; }; }) => db.delete('User', args.input),
        updateUser: (_: unknown, args: { input: updateUser; }) => db.update('User', args.input)
    }
};