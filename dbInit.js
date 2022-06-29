const Sequelize = require('sequelize');
const logger = require('./logger');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

require('./models/Guild')(sequelize, Sequelize.DataTypes);
require('./models/GuildMember')(sequelize, Sequelize.DataTypes);
require('./models/Invite')(sequelize, Sequelize.DataTypes);
require('./models/SettingsLogging')(sequelize, Sequelize.DataTypes);
require('./models/SettingsWelcoming')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');
const alter = process.argv.includes('--alter') || process.argv.includes('-a');

sequelize.sync({ force, alter }).then(async () => {
	logger.info('Database has been synced.');

	sequelize.close();
}).catch(logger.error);