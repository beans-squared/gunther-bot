const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'threadDelete',
	async execute(thread) {
		logger.debug(`A thread ${thread.name} (${thread.id}) was deleted in guild ${thread.guild.name} (${thread.guild.id})`);
		logging.logThreadDelete(thread);
	},
};