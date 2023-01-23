export const typeDefs = `#graphql
    scalar Date
    type User {
        id: ID!
        email: String!
        displayName: String
        todos: [Todo]
    }
    type Todo {
        id: ID!
        title: String!
        completed: Boolean!
        createdAt: Date!
        user: User
    }
    input AddTodoInput {
        title: String!
        completed: Boolean!
    }
    input UpdateTodoInput {
        id: ID!
        completed: Boolean
        title: String
    }
    input DeleteTodoInput {
        id: ID!
    }
    input AddUserInput {
        email: String!
        displayName: String
    }
    input UpdateUserInput {
        id: ID!
        email: String
        displayName: String
    }
    input DeleteUserInput {
        id: ID!
    }
    type Query {
        queryTodo: [Todo!]
        queryUser: [User!]
    }
    type Mutation {
        addTodo(input: AddTodoInput!): Todo!
        deleteTodo(input: DeleteTodoInput!): Todo!
        updateTodo(input: UpdateTodoInput!): Todo!
        addUser(input: AddUserInput!): User!
        updateUser(input: UpdateUserInput!): User!
        deleteUser(input: DeleteUserInput!): User!
    }
`;