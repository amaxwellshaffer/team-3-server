const sequelize = require('sequelize');

const db = new sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres'
});

module.exports = db;