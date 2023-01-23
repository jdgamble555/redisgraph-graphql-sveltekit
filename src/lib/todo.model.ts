export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    createdAt?: Date;
};

export interface User {
    id: string;
    displayName: string;
    email: string;
    todos?: [Todo]
};