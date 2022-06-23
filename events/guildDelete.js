const logger = require('../logger');
const Guilds = require('../dbObjects');

module.exports = {
	name: 'guildDelete',
	async execute(guild) {
		logger.info(`Client was kicked from guild ${guild.name} (${guild.id}) or guild was deleted.`);

		// Scrub guild from database
		logger.info(`Scrubbing guild (${guild.id}) from the database...`);

		await Guilds.destroy({
			where: {
				guild_id: guild.id,
			},
		});

		logger.info('Scrubbing completed.');
	},
};