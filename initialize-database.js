const Sequelize = require('sequelize');
const logger = require('./logger');

const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

require('./models/GuildMembers')(sequelize, Sequelize.DataTypes);
require('./models/Guilds')(sequelize, Sequelize.DataTypes);
require('./models/Logging')(sequelize, Sequelize.DataTypes);
require('./models/WelcomeMessages')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');
sequelize.sync({ force }).then(async () => {
	logger.info('Database has been synced.');

	sequelize.close();
}).catch(logger.error);