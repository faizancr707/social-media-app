// models/pictures.js

const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Pictures = sequelize.define('Pictures', {
   
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.TEXT(), 
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT(),
        allowNull: true
    }
});

module.exports = Pictures;
