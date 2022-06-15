const logging = require('../suites/logging');
const logger = require('../logger');

module.exports = {
	name: 'emojiUpdate',
	async execute(oldEmoji, newEmoji) {
		logger.debug(`Emoji ${oldEmoji.identifier} had its name changed to ${newEmoji.identifier} in guild ${newEmoji.guild.name} (${newEmoji.guild.id})`);
		logging.logEmojiUpdate(oldEmoji, newEmoji);
	},
};