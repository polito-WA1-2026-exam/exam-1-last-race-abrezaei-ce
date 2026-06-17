import { queryAll } from "../utils/query.js";

async function listSegments() {
    return await queryAll('SELECT * FROM segments');
}

export { listSegments }