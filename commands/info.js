const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');

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
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('channel')
				.setDescription('Get information about the current guild channel'),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('gunther')
				.setDescription('Get information about the bot'),
		),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
		switch (interaction.options.getSubcommand()) {
		case 'user': {
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
		}
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
		case 'channel': {
			const responseEmbed = new MessageEmbed()
				.setColor('#5865F2')
				.setTitle(`Channel: #${interaction.channel.name}`)
				.setDescription(`${interaction.channel.topic}`)
				.addFields(
					{ name: 'ID', value: `${interaction.channel.id}`, inline: true },
					{ name: 'Creation Date', value: `${dayjs(interaction.channel.createdAt).format('MMM D, YYYY')}`, inline: true },
					{ name: 'Channel Type', value: `${interaction.channel.type}`, inline: true },
					{ name: 'Category', value: `${interaction.channel.parent.name}`, inline: true },
					{ name: 'Members', value: `${interaction.channel.members.size}`, inline: true },
					{ name: 'NSFW Channel?', value: `${interaction.channel.nsfw}`, inline: true },
				);
			await interaction.reply({ embeds: [responseEmbed] });
			break;
		}
		case 'gunther': {
			const createdAt = dayjs(interaction.client.user.createdAt).format('MMM D, YYYY');
			const responseEmbed = new MessageEmbed()
				.setColor('#e5950b')
				.setAuthor({ name: `${interaction.client.user.tag}`, iconURL: `${interaction.client.user.avatarURL()}`, url: 'https://beansquared.net' })
				.setTitle('Gunther Discord Bot')
				.setURL('https://beansquared.net')
				.setDescription('Hey! I\'m Gunther, a custom built discord bot with a slew of features and a unique digital personality! I help moderate the servers I\'m in, offer a variety of utility commands, as well as some fun ones as well. Here\'s some information about me:')
				.addFields(
					{ name: 'Creator', value: '<@240161761393639425>', inline: true },
					{ name: 'Creation Date', value: `${createdAt}`, inline: true },
					{ name: 'Language', value: 'JavaScript, using the Discord.js library', inline: true },
					{ name: 'ID', value: `${interaction.client.user.id}`, inline: true },
					{ name: 'Servers Present In', value: `${interaction.client.guilds.cache.size}`, inline: true },
					// need to update this regularly, maybe store in config.json
					{ name: 'Total Lines of Code', value: '714', inline: true },
				);
				// Set this to the full Gunther art when it's done
				// .setImage();
			await interaction.reply({ embeds: [responseEmbed] });
			break;
		}
		}
	},
};
