const logging = require('../suites/logging');
const logger = require('../logger');

module.exports = {
	name: 'emojiCreate',
	async execute(emoji) {
		logger.debug(`An emoji ${emoji.identifier} was uploaded to guild ${emoji.guild}`);
		logging.logEmojiCreate(emoji);
	},
};