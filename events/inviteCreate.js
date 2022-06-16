const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'inviteCreate',
	async execute(invite) {
		logger.debug(`An invite with code ${invite.code} was created in guild ${invite.guild.name} (${invite.guild.id}) in channel #${invite.channel.name} (${invite.channel.id}) by ${invite.inviter.tag} (${invite.inviter.id})`);
		logging.logInviteCreate(invite);
	},
};