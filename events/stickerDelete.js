const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'stickerDelete',
	async execute(sticker) {
		logger.debug(`A sticker ${sticker.name} (${sticker.id}) was deleted from guild ${sticker.guild.name} (${sticker.guild.id})`);
		logging.logStickerDelete(sticker);
	},
};