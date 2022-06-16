const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'roleCreate',
	async execute(role) {
		logger.debug(`A role @${role.name} (${role.id}) was created in guild ${role.guild.name} (${role.guild.id})`);
		logging.logRoleCreate(role);
	},
};