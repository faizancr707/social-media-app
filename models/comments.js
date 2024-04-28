const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Comments = sequelize.define('Comments', {
    

     id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    comment: {
        type: Sequelize.TEXT(),
        allowNull: false
    }
});

module.exports = Comments;