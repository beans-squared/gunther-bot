const logging = require('../suites/logging');
const logger = require('../logger');

module.exports = {
	name: 'guildBanAdd',
	async execute(ban) {
		logger.debug(`${ban.user} was banned from guild ${ban.guild} by ${ban.client} for reason: ${ban.reason}.`);
		logging.logGuildBanAdd(ban);
	},
};