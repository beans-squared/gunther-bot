const logger = require('./../logger');

module.exports = {
	async cacheToggleStates() {
		logger.info('Initializing caching of control states for all guilds...');
		logger.info('Caching of control states completed.');
	},

	async toggleLogging() {
		return;
	},
};