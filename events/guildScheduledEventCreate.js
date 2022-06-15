const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'guildScheduledEventCreate',
	async execute(guildScheduledEvent) {
		logger.debug(`A new scheduled event ${guildScheduledEvent.name} (${guildScheduledEvent.id}) was created in guild ${guildScheduledEvent.guild.name} (${guildScheduledEvent.guild.id})`);
		logging.logGuildScheduledEventCreate(guildScheduledEvent);
	},
};