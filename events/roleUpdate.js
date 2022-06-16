const logger = require('../logger');
// const logging = require('../suites/logging');

module.exports = {
	name: 'roleUpdate',
	async execute(oldRole, newRole) {
		logger.debug(`A role ${oldRole.name} was updated to role ${newRole.name} (${newRole.id}) in guild ${newRole.guild.name} (${newRole.guild.id})`);
		// Temp disable
		// When role is updated, the list order for all roles is updated, which triggers the same event again (meaning updating one role updates all the roles in a guild)
		// logging.logRoleUpdate(oldRole, newRole);
	},
};