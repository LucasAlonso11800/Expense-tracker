import { Router } from "express";
import { mysqlQuery } from "../helpers/MySQLPromise";

export const router = Router();

router.post('/add', async (req, res) => {
    const { userId, name } = req.body;

    const query = `
        INSERT INTO categories
        (category_user_id, category_root, category_name)
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
            category_id AS id,
            category_name AS name,
            category_root AS root
        FROM categories
        WHERE category_user_id = ${userId} OR category_root = "Y"
        ORDER BY name
    `;

    try {
        const categories = await mysqlQuery(query);
        res.json(categories);
    }
    catch (err: any) {
        throw new Error(err);
    }
});

router.post('/update', async (req, res) => {
    const { id, name } = req.body;

    const query = `
        UPDATE categories
        SET category_name = "${name}"
        WHERE category_id = ${id}
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
            category_root AS root, 
            category_user_id AS userId 
            FROM categories WHERE category_id = ${id}
        `;

    const deleteQuery = `DELETE FROM categories WHERE category_id = ${id}`;

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