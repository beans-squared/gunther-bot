const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'error',
	async execute(error) {
		logger.warn('The client has encountered an error.');
		logging.logError(error);
	},
};