const { WelcomeMessages } = require('../dbObjects');
const { inlineCode } = require('@discordjs/builders');

const logger = require('./../logger');
const logging = require('../suites/logging');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'guildMemberAdd',
	async execute(member) {
		logging.logGuildMemberAdd(member);

		// Send the welcome message to the welcome channel defined in the database
		const welcomemessage = await WelcomeMessages.findOne({ where: { guild_id: member.guild.id } });

		if (welcomemessage) {
			const channel = await member.guild.channels.cache.find(element => element.id === welcomemessage.channel_id);
			logger.debug(`Custom welcome message found in database. Sending welcome message for new member ${member.user.tag}`);
			return channel.send(`${welcomemessage.message}`.replace('%MEMBER_NAME%', `${member.user}`).replace('%GUILD_NAME%', `${member.guild}`));
		}


		// Eventually want to switch this to be handled by a logging handler
		const channel = await member.guild.channels.cache.first();
		const warning = new MessageEmbed()
			.setColor('DARK_RED')
			.setDescription(`⚠️WARNING: Gunther attempted to post a welcome message, but your server has no welcome channel defined.\nYou can define a welcome channel using the ${inlineCode('/welcomemessages channel')} command.`)
			.setFooter({ text: 'System Warning' })
			.setTimestamp();
		return channel.send({ embeds: [ warning ] });
	},
};