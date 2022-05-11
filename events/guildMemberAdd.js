const logger = require('./../logger');
const { WelcomeMessages } = require('./../database-objects');
const { logChannel } = require('./../config.json');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		logger.debug(`User: ${member.user.tag} (${member.user.id}) has joined guild: ${member.guild} (${member.guild.id})`);

		// Send the welcome message to the welcome channel defined in the database
		const welcomemessage = await WelcomeMessages.findOne({ where: { guild_id: member.guild.id } });

		if (welcomemessage) {
			const channel = await member.guild.channels.cache.find(element => element.id === welcomemessage.channel_id);
			logger.debug(`Custom welcome message found in database. Sending welcome message for new member ${member.user.tag}`);
			return channel.send(`${welcomemessage.message}`.replace('%MEMBER_NAME%', `${member.user}`).replace('%GUILD_NAME%', `${member.guild}`));
		}

		const channel = await member.guild.channels.cache.find(element => element.name === logChannel);
		return channel.send('No custom welcome message is configured. You can set one up by using the /welcomemessages command.');
	},
};