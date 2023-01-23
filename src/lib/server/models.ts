export interface addTodo {
    title: string;
    completed: boolean;
    //user: User
};

export interface updateTodo {
    id: string;
    title?: string;
    completed?: boolean;
};

export interface addUser {
    displayName: string;
    email: string;
};

export interface updateUser {
    id: string;
    displayName?: string;
    email?: string;
};