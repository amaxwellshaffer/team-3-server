const sequelize = require('sequelize');
const database = require('../db');


const User = database.define('user', {
    email: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize.STRING,
        allowNull: false
    },
    userName:{
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }
});


module.exports = User;