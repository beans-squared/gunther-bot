const { deleteRoleMenu } = require('../commands/public/rolemenu');
const logger = require('./../logger');

module.exports = {
	name: 'messageDelete',
	async execute(message) {

		if (!message.guild) return;

		const fetchedLogs = await message.guild.fetchAuditLogs({
			limit: 1,
			type: 'MESSAGE_DELETE',
		});

		const deletionLog = fetchedLogs.entries.first();

		if (!deletionLog) return logger.info(`A message sent by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

		const { executor, target } = deletionLog;

		if (target.id === message.author.id) {
			logger.debug(`A message sent by ${message.author.tag} was deleted by ${executor.tag}.`);
		} else {
			logger.debug(`A message sent by ${message.author.tag} was deleted by an unknown user or application.`);
		}

		await deleteRoleMenu(message);
	},
};