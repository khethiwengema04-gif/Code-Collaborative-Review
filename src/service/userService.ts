import { query } from "../config/database"
import bcrypt from "bcryptjs"
import { User } from "../types/user.types"
import { new_user } from "../types/user.types";

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const { rows } = await query("SELECT * FROM users WHERE email = $1", [email]);
    return rows[0] || null;
};

export const createUser = async (userData: new_user): Promise<User> => {
    const { email, password, name, role } = userData
    const salt = await bcrypt.genSalt(10);


    const { rows } = await query(
        "INSERT INTO users (email, password, name, role) VALUES ($1,$2,$3,$4) RETURNING*",
        [email, password, name, role]
    );
    return rows[0];
};

//additions for crud
export const findAllUsers = async (): Promise<User[]> => {
    const { rows } = await query(
        "SELECT * FROM Users ORDER BY applied_at DESC"

    );
    return rows
}

export const findUserById = async (id: number): Promise<User | null> => {
    const { rows } = await query("SELECT * FROM Users WHERE id = $1", [
        id,

    ]);
    return rows[0] || null;
}
export const updateUser = async (id: number, userData: User): Promise<User | null> => {
    const { email, password, name, role } = userData
    const { rows } = await query("UPDATE Users SET email = $1, password_hash = $2 WHERE id = $3 RETURNING*",
        [email, password, name, role, id]
    );
    return rows[0] || null;
};

export const deleteUser = async (id: number): Promise<User | null> => {
    const { rows } = await query(" DELETE FROM Users WHERE id = $1 RETURNING *", [id]

    );
    return rows[0] || null;
};

