import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import 'dotenv/config';

import { router as movementsRouter } from './routes/movements';
import { router as categoriesRouter } from './routes/categories';
import { router as usersRouter } from './routes/users';
import { router as accountsRouter } from './routes/accounts';

const app = express();

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const connection = mysql.createConnection({
    host: process.env.dbHost,
    database: process.env.dbDatabase,
    user: process.env.dbUser,
    password: process.env.dbPassword,
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.use('/movements', movementsRouter);
app.use('/categories', categoriesRouter);
app.use('/users', usersRouter);
app.use('/accounts', accountsRouter);

const PORT = 5000 || process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));