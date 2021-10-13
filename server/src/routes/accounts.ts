import { Router } from "express";
import { mysqlQuery } from "../helpers/MySQLPromise";

export const router = Router();

router.post('/get', async (req, res) => {
    const { userId } = req.body;

    const query = `
        SELECT 
            account_id AS id,
            account_name AS name
        FROM accounts
        WHERE account_user_id = ${userId} OR account_root = "Y"
        ORDER BY name
    `;

    try {
        const accounts = await mysqlQuery(query);
        res.json(accounts);
    }
    catch (err: any) {
        throw new Error(err);
    }
});