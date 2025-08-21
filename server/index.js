const path = require('path');
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./configs/db');


const authRouter = require('./routers/authRouter');
const employeesRouter = require('./routers/employeesRouter');
const departmentsRouter = require('./routers/departmentsRouter');
const shiftsRouter = require('./routers/shiftsRouter');
const usersRouter = require('./routers/usersRouter');


const { verifyJWT } = require('./middlewares/auth');
const actionsLimiter = require('./middlewares/actionsLimiter');
const actionLogger = require('./middlewares/actionLogger');


const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRouter);

app.use(verifyJWT, actionsLimiter, actionLogger);


app.use('/employees', employeesRouter);
app.use('/departments', departmentsRouter);
app.use('/shifts', shiftsRouter);
app.use('/users', usersRouter);


app.get('/health', (req, res) => res.json({ ok: true }));


app.use((err, req, res, next) => {
console.error(err);
res.status(err.status || 500).json({ error: err.message || 'Server error' });
});


app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));