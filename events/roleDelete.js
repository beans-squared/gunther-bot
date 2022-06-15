const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'roleDelete',
	async execute(role) {
		logger.debug(`A role ${role.name} (${role.id}) was deleted from guild ${role.guild.name} (${role.guild.id})`);
		logging.logRoleDelete(role);
	},
};