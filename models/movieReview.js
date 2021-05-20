const {DataTypes} = require('sequelize');
const database = require('../db');

module.exports = database.define('movie-review', {
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    year:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    comment:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    owner:{
        type: DataTypes.INTEGER
    }
    
});