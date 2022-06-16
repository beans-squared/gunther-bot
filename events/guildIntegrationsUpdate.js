const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'guildIntegrationsUpdate',
	async execute(guild) {
		logger.debug(`A guild ${guild.name} (${guild.id}) has its integrations updated.`);
		logging.logGuildIntegrationsUpdate(guild);
	},
};