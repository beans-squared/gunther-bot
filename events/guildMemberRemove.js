const logger = require('./../logger');

module.exports = {
	name: 'guildMemberRemove',
	async execute(member) {
		const fetchedLogs = await member.guild.fetchAuditLogs({
			limit: 1,
			type: 'MEMBER_KICK',
		});

		const kickLog = fetchedLogs.entries.first();

		if (!kickLog) return logger.debug(`${member.user.tag} has left the guild, reason unknown.`);

		const { executor, target } = kickLog;

		if (target.id === member.id) {
			logger.debug(`${member.user.tag} was kicked from the guild by ${executor.tag}.`);
		} else {
			logger.debug(`${member.user.tag} has left the guild; audit log fetch was inconclusive.`);
		}
	},
};