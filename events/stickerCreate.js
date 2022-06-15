const logger = require('../logger');
const logging = require('../suites/logging');

module.exports = {
	name: 'stickerCreate',
	async execute(sticker) {
		logger.debug(`A sticker ${sticker.name} (${sticker.id}) was created in guild ${sticker.guild.name} (${sticker.guild.id})`);
		logging.logStickerCreate(sticker);
	},
};