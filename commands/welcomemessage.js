const { SlashCommandBuilder } = require('@discordjs/builders');
const { WelcomeMessages } = require('./../database-objects');
const logger = require('./../logger');

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
						.setDescription('The new message you want the custom welcome message to be'),
				),
		),
	async execute(interaction) {
		const newMessage = interaction.options.getString('message');

		const affectedRows = await WelcomeMessages.update({ message: newMessage }, { where: { guild_id: interaction.guild.id } });

		if (affectedRows > 0) {
			logger.debug('Guild found in database. Updated welcome message content.');
			return await interaction.reply(`Your guild's welcome message was edited successfully to: ${newMessage}`);
		}

		const message = await WelcomeMessages.create({
			guild_id: interaction.guild.id,
			message: newMessage,
		});

		logger.debug('Guild not found in database. Created new entry and added custom welcome message.');
		return await interaction.reply(`Your guild's welcome message was edited successfully to: ${message.message}`);
	},
};