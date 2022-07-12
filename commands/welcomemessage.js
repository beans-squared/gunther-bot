const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChannelType } = require('discord-api-types/v10');
const { WelcomeMessages } = require('../dbObjects');
const logger = require('../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('welcomemessage')
		.setDescription('Modify the custom welcome message for your server.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('edit')
				.setDescription('Edit your server\'s custom welcome message')
				.addStringOption(option =>
					option
						.setName('message')
						.setDescription('The new message you want the custom welcome message to be')
						.setRequired(true),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('channel')
				.setDescription('Select which channel you want welcome messages to be sent in.')
				.addChannelOption(option =>
					option
						.setName('channel-name')
						.setDescription('The name of the channel')
						.addChannelTypes(
							ChannelType.GuildText,
						)
						.setRequired(true),
				),
		),
	async execute(interaction) {
		if (!interaction.inGuild()) return await interaction.reply({ content: 'This command can only be run in a server text channel.', ephemeral: true });

		if (interaction.options.getSubcommand() === 'edit') {
			const newMessage = interaction.options.getString('message');

			const affectedRows = await WelcomeMessages.update({ message: newMessage }, { where: { guild_id: interaction.guild.id } });

			if (affectedRows > 0) {
				logger.debug('Guild found in database. Updated welcome message content.');
				return await interaction.reply(`Your guild's welcome message was edited successfully to: ${newMessage}`);
			}

			await WelcomeMessages.create({
				guild_id: interaction.guild.id,
				channel_id: interaction.channel.id,
				message: newMessage,
			});

			logger.debug('Guild not found in database. Created new entry and added custom welcome message.');
			return await interaction.reply(`
				Your guild's welcome message was edited successfully to: ${newMessage}.

				You have not previously defined a welcome channel, so I have set it to this channel for now.
				To change the welcome message channel, simply use the command /welcomemessages channel.
				`);
		} else {
			const newChannel = interaction.options.getChannel('channel-name');

			const affectedRows = await WelcomeMessages.update({ channel_id: newChannel.id }, { where: { guild_id: interaction.guild.id } });

			if (affectedRows > 0) {
				logger.debug('Guild found in database. Updated welcome message channel ID.');
				return await interaction.reply(`Your guild's welcome channel was updated to ${newChannel}.`);
			}

			await WelcomeMessages.create({
				guild_id: interaction.guild.id,
				channel_id: newChannel.id,
			});

			logger.debug('Guild not found in database. Created new entry and added welcome channel ID.');
			return await interaction.reply(
				`Your guild's welcome channel was updated to ${newChannel}.

				You have not previously defined a custom welcome message, so it has set to the default welcome message.
				To change your welcome message, simply use the command /welcomemessages edit.
				`);
		}
	},
};