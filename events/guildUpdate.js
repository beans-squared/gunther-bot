const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'guildUpdate',
	async execute(oldGuild, newGuild) {
		logger.debug(`A guild ${newGuild.name} (${newGuild.id}) had its settings updated.`);
		logging.logGuildUpdate(oldGuild, newGuild);
	},
};