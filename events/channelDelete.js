const logging = require('../suites/logging');
const logger = require('./../logger');

module.exports = {
	name: 'channelDelete',
	async execute(channel) {
		logger.debug(`Channel ${channel} was deleted in guild ${channel.guild.name}`);
		logging.logChannelDelete(channel);
	},
};