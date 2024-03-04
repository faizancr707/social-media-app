
const Sequelize = require('sequelize');

const sequelize = new Sequelize('social-media', 'root', 'IASFaizan@7', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false, 
});

module.exports = sequelize;

