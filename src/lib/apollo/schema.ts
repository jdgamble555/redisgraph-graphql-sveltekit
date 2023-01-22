export const typeDefs = `#graphql
    type User {
        id: ID!
        email: String!
        displayName: String
        tasks: [Task]
    }
    type Task {
        id: ID!
        title: String!
        completed: Boolean
        user: User
    }
    input AddTaskInput {
        title: String!
        completed: Boolean!
    }

    input AddUserInput {
        email: String!
        fid: String!
        displayName: String
        username: String
    }

    input DeleteTaskInput {
        id: ID!
    }

    input UpdateTaskInput {
        id: ID!
        completed: Boolean
        title: String
    }

    type Query {
        getUser(id: ID!, email: String, fid: String): User!
        queryTask: [Task!]
        queryUser: [User!]
    }
    type Mutation {
        addTask(input: AddTaskInput!): Task!
        deleteTask(input: DeleteTaskInput!): Task!
        updateTask(input: UpdateTaskInput!): Task!
        addUser(input: AddUserInput!): User!
    }
`;