const logging = require('../suites/logging');
const logger = require('../logger');

module.exports = {
	name: 'guildBanRemove',
	async execute(ban) {
		logger.debug(`${ban.user} was unbanned from guild ${ban.guild} for reason ${ban.reason}`);
		logging.logGuildBanRemove(ban);
	},
};