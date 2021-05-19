const sequelize = require('sequelize');

const db = new sequelize(process.env.DB_NAME, 'postgres', process.env.DB_PASSWORD,{
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;