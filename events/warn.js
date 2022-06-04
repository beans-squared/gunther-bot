const logger = require('../logger');

module.exports = {
	name: 'warn',
	execute(info) {
		logger.warn(info);
	},
};