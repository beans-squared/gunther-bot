const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Logging = require('./models/Logging')(sequelize, Sequelize.DataTypes);
const WelcomeMessages = require('./models/WelcomeMessages')(sequelize, Sequelize.DataTypes);

module.exports = { Logging, WelcomeMessages };