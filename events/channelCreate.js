const logging = require('../suites/logging');
const logger = require('./../logger');

module.exports = {
	name: 'channelCreate',
	async execute(channel) {
		logger.debug(`A channel ${channel.name} was created in guild ${channel.guild.name}.`);
		logging.logChannelCreate(channel);
	},
};