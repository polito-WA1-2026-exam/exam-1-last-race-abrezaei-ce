import { queryAll } from "../utils/query.js";

async function listEvents() {
    return await queryAll('SELECT * FROM events');
}

export { listEvents }