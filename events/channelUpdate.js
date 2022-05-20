const logging = require('../suites/logging');
const logger = require('./../logger');

module.exports = {
	name: 'channelUpdate',
	async execute(oldChannel, newChannel) {
		logger.debug(`A channel ${oldChannel} was updated to channel ${newChannel} in guild ${newChannel.guild}`);
		logging.logChannelUpdate(oldChannel, newChannel);
	},
};