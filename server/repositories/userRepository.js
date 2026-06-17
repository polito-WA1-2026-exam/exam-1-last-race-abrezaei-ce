import { queryGet } from "../utils/query";
import crypto from "node:crypto";

async function getUserByUsernameAndPassword(username, password) {
    const user = await queryGet("SELECT * FROM users WHERE username = ?", [username]);

    if (!user) return false;

    const temp = crypto.scryptSync(password, user.salt, 64);

    if (!crypto.timingSafeEqual(Buffer.from(user.hashed_password, 'hex'), temp)) return false;

    return {
        id: user.id,
        username: user.username
    }
}

export { getUserByUsernameAndPassword };