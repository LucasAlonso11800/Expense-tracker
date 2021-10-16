import { Router } from "express";
import { mysqlQuery } from "../helpers/MySQLPromise";

export const router = Router();

type TotalsResponse = {
    amount: number
    type: 'I' | 'O'
}[];

router.post('/add', async (req, res) => {
    const { userId, name } = req.body;

    const query = `
        INSERT INTO accounts
        (account_user_id, account_root, account_name)
        VALUES (${userId}, "N", "${name}")
    `;

    try {
        await mysqlQuery(query);
        res.json('Added');
    }
    catch (err: any) {
        throw new Error(err);
    }
});

router.post('/get', async (req, res) => {
    const { userId } = req.body;

    const query = `
        SELECT 
            account_id AS id,
            account_name AS name,
            account_root AS root
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

router.post('/get-totals', async (req, res) => {
    const { accountId, userId } = req.body;

    const query = `
        SELECT 
            movement_amount AS amount,
            movement_type AS type    
        FROM movements
        WHERE movement_account_id = ${accountId}
        AND movement_user_id = ${userId}
    `;

    try {
        const response: TotalsResponse = await mysqlQuery(query);

        const total: number = response.reduce((acc, row) => {
            if(row.type === 'I') return acc + row.amount;
            if(row.type === 'O') return acc - row.amount;
            return acc;
        }, 0);

        res.json(total);
    }
    catch (err: any) {
        throw new Error(err);
    }
});

router.post('/update', async (req, res) => {
    const { id, name } = req.body;

    const query = `
        UPDATE accounts
        SET account_name = "${name}"
        WHERE account_id = ${id}
    `;

    try {
        await mysqlQuery(query)
        res.json('updated')
    }
    catch (err: any) {
        throw new Error(err);
    }
});

router.post('/delete', async (req, res) => {
    const { id, userId } = req.body;

    const selectQuery = `
        SELECT 
            account_root AS root, 
            account_user_id AS userId 
        FROM accounts WHERE account_id = ${id}
        `;

    const deleteQuery = `DELETE FROM accounts WHERE account_id = ${id}`;

    try {
        const category = await mysqlQuery(selectQuery);

        if (category[0].root === 'Y' || category[0].userId !== userId) throw new Error('Not allowed');

        await mysqlQuery(deleteQuery);
        res.json('Deleted');
    }
    catch (err: any) {
        throw new Error(err);
    }
});