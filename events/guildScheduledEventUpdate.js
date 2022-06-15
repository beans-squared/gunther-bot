const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'guildScheduledEventUpdate',
	async execute(oldGuildScheduledEvent, newGuildScheduledEvent) {
		logger.debug(`A scheduled event ${newGuildScheduledEvent.name} (${newGuildScheduledEvent.id}) was updated in guild ${newGuildScheduledEvent.guild.name} (${newGuildScheduledEvent.guild.id})`);
		logging.logGuildScheduledEventUpdate(oldGuildScheduledEvent, newGuildScheduledEvent);
	},
};