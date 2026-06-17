import { queryAll } from "../utils/query.js";

async function listLines() {
    return await queryAll('SELECT * FROM lines');
}

export { listLines }