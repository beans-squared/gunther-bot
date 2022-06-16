const logging = require('../suites/logging');
const logger = require('../logger');

module.exports = {
	name: 'emojiDelete',
	async execute(emoji) {
		logger.debug(`An emoji (${emoji.identifier}) was deleted from guild ${emoji.guild.name} (${emoji.guild.id})`);
		logging.logEmojiDelete(emoji);
	},
};