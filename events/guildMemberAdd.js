const logger = require('./../logger');
const welcomeMessages = require('./welcomeMessages.json');
const { welcomeChannelName } = require('./../config.json');

module.exports = {
	name: 'guildMemberAdd',
	execute(member) {
		logger.debug(`User: ${member.user.tag} (${member.user.id}) has joined guild: ${member.guild} (${member.guild.id})`);

		// Send the welcome message to the welcome channel defined in config.json
		const channel = member.guild.channels.cache.find(element => element.name === welcomeChannelName);
		channel.send(
			`${welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]}`
				.replace('%MEMBER_NAME%', `${member.user}`)
				.replace('%GUILD_NAME%', `${member.guild}`),
		);
	},
};