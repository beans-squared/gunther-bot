const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'stickerUpdate',
	async execute(oldSticker, newSticker) {
		logger.debug(`A sticker ${oldSticker.name} was updated to ${newSticker.name} (${newSticker.id}) in guild ${newSticker.guild.name} (${newSticker.guild.id})`);
		logging.logStickerUpdate(oldSticker, newSticker);
	},
};