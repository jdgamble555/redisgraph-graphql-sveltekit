import { db } from "./db";
import type { Task } from "./task.model";

export const resolvers = {
    Query: {
        queryTask: () => db.query(),
    },
    Mutation: {
        addTask: (_: unknown, args: { input: Task; }) => db.add(args.input),
        deleteTask: (_: unknown, args: { input: { id: string; }; }) => db.delete(args.input),
        updateTask: (_: unknown, args: { input: Task; }) => db.update(args.input)
    }
};