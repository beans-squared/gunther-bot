const logger = require('../logger');
const { Guilds } = require('../dbObjects');

module.exports = {
	name: 'guildCreate',
	async execute(guild) {
		logger.info(`Client has joined guild ${guild.name} (${guild.id})`);

		// Register Guild information in database
		logger.info('Registering guild information to the database...');

		const [createdGuild, created] = await Guilds.findOrCreate({
			where: {
				guild_id: guild.id,
			},
			defaults: {
				guild_id: guild.id,
			},
		});

		if (created) {
			logger.info(`New guild information saved to database (${createdGuild.guild_id})`);
		} else {
			logger.info('Guild already has an entry in the database.');
		}
	},
};