import { Router } from "express";
import { getMovementsConditional } from "../helpers/getMovementsConditional";
import { mysqlQuery } from "../helpers/MySQLPromise";

export const router = Router();

router.post('/add', async (req, res) => {
    const { type, amount, date, description, categoryId, userId } = req.body;

    const query = `
        INSERT INTO movements 
        (movement_type, movement_amount, movement_date, movement_description, movement_category_id, movement_user_id)
        VALUES ("${type}", ${amount}, "${date}", "${description}", ${categoryId}, ${userId})
    `;

    try {
        await mysqlQuery(query);
        res.json('Added');
    }
    catch(err: any) {
        throw new Error(err);
    }
});

router.post('/get', async (req, res) => {
    const { type, dateFrom, dateTo, categoryId, userId } = req.body;

    const where = getMovementsConditional(type, dateFrom, dateTo, categoryId, userId);

    const query = `
        SELECT
            movement_id AS id,
            movement_type AS type,
            movement_amount AS amount,
            movement_date AS date,
            movement_description AS description,
            category_name AS category
        FROM movements
        JOIN categories
        ON category_id = movement_category_id
        ${where}
        ORDER BY movement_date 
    `;

    try {   
        const movements = await mysqlQuery(query)
        res.json(movements)
    }
    catch (err: any) {
        throw new Error(err)
    }
});

router.post('/update', async (req, res) => {
    const { id, type, amount, date, description, categoryId } = req.body;

    const query = `
        UPDATE movements
        SET movement_type = "${type}", 
            movement_amount = ${amount}, 
            movement_date = "${date}",
            movement_description = "${description}",
            movement_category_id = ${categoryId}
        WHERE movement_id = ${id}
    `;
    try {
        await mysqlQuery(query)
        res.json('updated')
    }
    catch(err: any) {
        throw new Error(err);
    }
});

router.post('/delete', async (req, res) => {
    const { id } = req.body;
    
    const query = `DELETE FROM movements WHERE movement_id = ${id}`
    
    try {
        await mysqlQuery(query)
        res.json('deleted')
    } 
    catch(err: any) {
        throw new Error(err);
    }
});