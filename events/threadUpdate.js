const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'threadUpdate',
	async execute(oldThread, newThread) {
		logger.debug(`A thread ${oldThread.name} was updated to thread ${newThread.name} (${newThread.id}) in guild ${newThread.guild.name} (${newThread.guild.id})`);
		logging.logThreadUpdate(oldThread, newThread);
	},
};