require('dotenv').config();

const Express = require('express');
const database = require('./db');
const userController = require('./controllers/userController');
//const pirateMimeController = require('./controllers/pirateMimeController');

const app = Express();

app.use(require('./middleware/headers'));
app.use(Express.json());

app.use('/user', userController);
//app.use('/piratemime', pirateMimeController);

database.sync();

app.listen(process.env.PORT, () => console.log(`[port ${process.env.PORT}] app is listening`));