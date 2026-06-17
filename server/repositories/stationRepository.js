import { queryAll } from "../utils/query.js";

async function listStations() {
    return await queryAll('SELECT * FROM stations');
}

export { listStations }