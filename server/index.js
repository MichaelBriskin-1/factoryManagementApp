// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./configs/db');
// const employeesRouter = require('./routers/employeesRouter')

import express from 'express';
import cors from 'cors';
import {connectDB} from './configs/db.js';
import employeesRouter from './routers/employeesRouter.js';

const app = express();
const PORT = 3000;

connectDB();

app.use(cors());

app.use('/', express.json());

app.use('/employees', employeesRouter);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});
