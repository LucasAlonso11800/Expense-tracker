import { Router } from "express";
import { mysqlQuery } from "../helpers/MySQLPromise";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const router = Router();

type User = {
    id: string
    username: string
    password?: string
};

const generateToken = (user: User) => {
    return jwt.sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' })
};

router.post('/add', async (req, res) => {
    const { username, password, email } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const query = `
        INSERT INTO users (user_username, user_password, user_email)
        VALUES ("${username}", "${hash}", "${email}")
    `;

    try {
        const insertedUser = await mysqlQuery(query);

        const token = generateToken({ username, id: insertedUser.insertId })

        res.json({
            id: insertedUser.insertId,
            username,
            token
        });
    }
    catch (err: any) {
        if (err.sqlMessage && err.sqlMessage.startsWith('Duplicate entry')) {
            if (/users.user_email/.test(err.sqlMessage)) throw new Error("Email already registered");
        }
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const getUserQuery = `
        SELECT
            user_id AS id,
            user_username AS username,
            user_email AS email,
            user_password AS password
        FROM users 
        WHERE user_email = "${email}"
    `;

    const response: User[] = await mysqlQuery(getUserQuery);
    const user = response[0];

    if (!user) throw new Error('Wrong email or password');

    const match = await bcrypt.compare(password, user.password as string);
    if (!match) throw new Error('Wrong email or password');

    const token = generateToken(user);

    res.json({
        id: user.id,
        username: user.username,
        token
    });
});