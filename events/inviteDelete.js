const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'inviteDelete',
	async execute(invite) {
		logger.debug(`An invite with code ${invite.code} was deleted in guild ${invite.guild.name} (${invite.guild.id}).`);
		logging.logInviteDelete(invite);
	},
};