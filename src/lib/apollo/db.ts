import { query } from "./redis";
import type { Task } from "./task.model";
import { formatResults, pretty_json } from "./utils";

export const db = {

    query: async () => {
        const r = await query('MATCH (n:Task) RETURN toJSON(n)');
        if (r?.data) {
            return formatResults(r.data);
        }
        return;
    },

    add: async ({ title, completed }: Task) => {
        const params = { completed, title };
        const q = `CREATE (a:Task` + pretty_json(params) + ') RETURN toJSON(a)';
        const r = await query(q);
        if (r?.data) {
            return formatResults(r.data);
        }
        return;
    },
    delete: async ({ id }: {id: string}) => {
        const q = `MATCH (n) WHERE ID(n)=${id} DELETE n RETURN toJSON(n)`;
        const r = await query(q);
        if (r?.data) {
            return formatResults(r.data);
        }
        return;
    },
    update: async ({ id, title, completed }: Task) => {
        const t = title ? ` n.title = '${title},` : '';
        const q = `MATCH (n) WHERE ID(n)=${id} SET${t} n.completed = ${completed} RETURN toJSON(n)`;
        const r = await query(q);
        if (r?.data) {
            return formatResults(r.data);
        }
        return;
    }
};

