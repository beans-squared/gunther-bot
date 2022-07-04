const { calculateXp, recordXpGainToMemory, isCooldownActive, activateCooldown } = require('../suites/leveling');
const logger = require('./../logger');

module.exports = {
	name: 'messageCreate',
	execute(message) {
		// Prevents the bot from acting on messages sent by itself or other bots
		if (message.author.bot) return;

		// Information message for when the bot is sent a DM
		if (message.channel.type === 'DM') {
			logger.debug(`Received a DM from ${message.author.tag}`);
			message.author.send(`Hey there, ${message.author.username}!\n\nMy name is Gunther, and I am a work in progress, custom-built discord bot. If you'd like to know more about me, check back later and I may have more information for you!\n\nHave a nice day!`);
			// When the message is sent in a guild text channel
		} else if (message.channel.type === 'GUILD_TEXT') {
			// Xp
			if (isCooldownActive()) {
				0;
			} else {
				activateCooldown();
				recordXpGainToMemory(message.member, calculateXp(message.member));
			}

			if (message.content.includes('Gunther!')) {
				message.channel.send('Hey!');
			}
		}
	},
};
