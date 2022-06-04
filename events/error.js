const logger = require('../logger');

module.exports = {
	name: 'error',
	execute(error) {
		logger.error(error);
	},
};