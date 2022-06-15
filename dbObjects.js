const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const GuildMembers = require('./models/GuildMembers')(sequelize, Sequelize.DataTypes);
const Guilds = require('./models/Guilds')(sequelize, Sequelize.DataTypes);
const Logging = require('./models/Logging')(sequelize, Sequelize.DataTypes);
const WelcomeMessages = require('./models/WelcomeMessages')(sequelize, Sequelize.DataTypes);

GuildMembers.belongsTo(Guilds, { foreignKey: 'guild_id', as: 'guild' });

module.exports = { GuildMembers, Guilds, Logging, WelcomeMessages };