import { page } from "$app/stores";
import { get, writable } from "svelte/store";
import type { Todo } from "./todo.model";


// todos

export const db = (() => {

    const { set, update, subscribe } = writable<Todo[]>([], set => {
        refreshQuery().then((r) => set(r));
    });

    return {

        getTodos: () => ({ set, update, subscribe }),

        addTodo: async (text: string) => {
            const q = `mutation { addTask(input: { title: "${text}", completed: false }) { id title completed } }`;
            const r = await gql(q).then((r) => r.addTask);
            update((v) => ([...v, r]));
        },

        updateTodo: async (id: string, complete: boolean) => {
            const q = `mutation { updateTask(input: { id: "${id}", completed: ${complete} }) { id title completed } }`;
            const r = await gql(q).then((r) => r.updateTask);
            update((v) => {
                const i = v.findIndex(r => r['id'] === id);
                if (i !== -1) v.splice(i, 1, r);
                return v;
            });
        },

        deleteTodo: async (id: string) => {
            const q = `mutation { deleteTask(input: { id: "${id}"}) { id title completed } }`;
            await gql(q).then((r) => r.deleteTask);
            update((v) => {
                const i = v.findIndex(r => r['id'] === id);
                if (i !== -1) v.splice(i, 1);
                return v;
            });
        }
    }
})();

const gql = async (query: string) => {
    const res = await fetch(get(page).url.origin + '/graphql', {
        method: 'POST',
        body: JSON.stringify({ query })
    });
    const r = await res.json();
    return r.data;
};

const refreshQuery = async () => {
    const query = `query { queryTask { id title completed } }`;
    const r = await gql(query);
    return r.queryTask;
};
