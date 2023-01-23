/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from "./redis";
import { create_set, formatResults, pretty_json } from "./utils";

export const db = {

    query: async (label: string, context?: any) => {
        const r = await query(`MATCH (n:${label}) WHERE n.uid = '${context.user.email}' RETURN toJSON(n)`);
        if (r?.data) {
            return formatResults(r.data);
        }
        return;
    },

    add: async (label: string, params: any, context?: any) => {
        params = { createdAt: new Date().getTime(), uid: context.user.email, ...params };
        const q = `CREATE (a:${label}` + pretty_json(params) + ') RETURN toJSON(a)';
        const r = await query(q);
        if (r?.data) {
            return formatResults(r.data);
        }
        return;
    },
    delete: async (label: string, { id }: { id: string }, context?: any) => {
        const q = `MATCH (n:${label}) WHERE ID(n)=${id} AND n.uid = '${context.user.email}' DELETE n RETURN toJSON(n)`;
        const r = await query(q);
        if (r?.data) {
            return formatResults(r.data);
        }
        return;
    },
    update: async (label: string, params: any, context?: any) => {
        params = { updatedAt: new Date().getTime(), ...params };
        const q = `MATCH (n:${label}) WHERE ID(n)=${params['id']} AND n.uid = '${context.user.email}' ${create_set(params)} RETURN toJSON(n)`;
        const r = await query(q);
        if (r?.data) {
            return formatResults(r.data);
        }
        return;
    }
};


