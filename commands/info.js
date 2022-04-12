const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Request information about a user or server')
		.addSubcommand(subcommand =>
			subcommand
				.setName('user')
				.setDescription('Request information about a user')
				.addUserOption(option =>
					option
						.setName('target')
						.setDescription('The user to request information of'),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Request information about a server'),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		switch (interaction.options.getSubcommand()) {
		case 'user':
			if (user) {
				const responseEmbed = new MessageEmbed()
					.setColor(user.accentColor)
					.setTitle(user.tag)
					.setThumbnail(user.avatarURL())
					.addFields(
						{ name: 'Username', value: `${user.username}`, inline: true },
						{ name: 'Account Creation Date', value: `${user.createdAt}`, inline: true },
						{ name: 'ID', value: `${user.id}`, inline: true },
					);
				await interaction.reply({ embeds: [responseEmbed] });
			} else {
				const responseEmbed = new MessageEmbed()
					.setColor(interaction.user.accentColor)
					.setTitle(interaction.user.tag)
					.setThumbnail(interaction.user.avatarURL())
					.addFields(
						{ name: 'Username', value: `${interaction.user.username}`, inline: true },
						{ name: 'Account Creation Date', value: `${interaction.user.createdAt}`, inline: true },
						{ name: 'User ID', value: `${interaction.user.id}`, inline: true },
					);
				await interaction.reply({ embeds: [responseEmbed] });
			}
			break;
		case 'server': {
			const serverOwner = await interaction.guild.fetchOwner();
			const responseEmbed = new MessageEmbed()
				.setTitle(interaction.guild.name)
				.setThumbnail(interaction.guild.iconURL())
				.addFields(
					{ name: 'Guild Name', value: `${interaction.guild.name}`, inline: true },
					{ name: 'Guild Description', value: `${interaction.guild.description}`, inline: true },
					{ name: 'Guild Creation Date', value: `${interaction.guild.createdAt}`, inline: true },
					{ name: 'Guild ID', value: `${interaction.guild.id}`, inline: true },
					{ name: 'Guild Owner', value: `${serverOwner.user.tag}`, inline: true },
					{ name: 'Guild Member Count', value: `${interaction.guild.memberCount}/${interaction.guild.maximumMembers}`, inline: true },
				);
			await interaction.reply({ embeds: [responseEmbed] });
			break;
		}
		}
	},
};
