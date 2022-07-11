const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Guilds = require('./models/Guild')(sequelize, Sequelize.DataTypes);
const GuildMembers = require('./models/GuildMember')(sequelize, Sequelize.DataTypes);
const Invites = require('./models/Invite')(sequelize, Sequelize.DataTypes);
const RoleMenus = require('./models/RoleMenu')(sequelize, Sequelize.DataTypes);
const Logging = require('./models/SettingsLogging')(sequelize, Sequelize.DataTypes);
const WelcomeMessages = require('./models/SettingsWelcoming')(sequelize, Sequelize.DataTypes);

GuildMembers.belongsTo(Guilds, { foreignKey: 'guild_id', as: 'guild' });

module.exports = { GuildMembers, Guilds, Invites, RoleMenus, Logging, WelcomeMessages };