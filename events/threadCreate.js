const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'threadCreate',
	async execute(thread) {
		logger.debug(`A thread ${thread.name} (${thread.id}) was created by ${thread.fetchOwner().guildMember} in guild ${thread.guild.name} (${thread.guild.id}) OR the client was added to the above thread.`);
		logging.logThreadCreate(thread);
	},
};