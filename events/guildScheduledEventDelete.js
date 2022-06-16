const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'guildScheduledEventDelete',
	async execute(guildScheduledEvent) {
		logger.debug(`A scheduled event ${guildScheduledEvent.name} (${guildScheduledEvent.id}) was deleted in guild ${guildScheduledEvent.guild.name} (${guildScheduledEvent.guild.id})`);
		logging.logGuildScheduledEventDelete(guildScheduledEvent);
	},
};