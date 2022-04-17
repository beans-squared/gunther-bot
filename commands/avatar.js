const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get a link to a user or guild\'s current avatar')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Get a user\'s avatar')
				.addUserOption(option =>
					option
						.setName('tag')
						.setDescription('Specify which user you want the avatar of'),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Get the server\'s icon'),
		),
	async execute(interaction) {
		if (interaction.options.getSubcommand() === 'user') {
			const user = interaction.options.getUser('tag');
			if (user) {
				const embed = new MessageEmbed()
					.setTitle(user.tag)
					.setURL(user.avatarURL())
					.setImage(user.avatarURL());
				await interaction.reply({ embeds: [embed] });
			} else {
				const embed = new MessageEmbed()
					.setTitle(interaction.user.tag)
					.setURL(interaction.user.avatarURL())
					.setImage(interaction.user.avatarURL());
				await interaction.reply({ embeds: [embed] });
			}
		} else if (interaction.options.getSubcommand() === 'server') {
			const embed = new MessageEmbed()
				.setTitle(interaction.guild.name)
				.setURL(interaction.guild.iconURL())
				.setImage(interaction.guild.iconURL());
			await interaction.reply({ embeds: [embed] });
		}
	},
};