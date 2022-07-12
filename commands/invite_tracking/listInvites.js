const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { Invites } = require('../../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listinvites')
		.setDescription('List the invites for this server.'),
	async execute(interaction) {
		await interaction.deferReply();

		const invites = await Invites.findAll({
			where: {
				guild_id: interaction.guild.id,
			},
		});

		if (!invites.length) return interaction.editReply({ content: 'No invites exist for this server yet.', ephemeral: true });

		const list = new MessageEmbed()
			.setColor('BLURPLE')
			.setTitle(`Invites for ${interaction.guild.name}`);

		for (const invite of invites) {
			const fetchedInvite = await interaction.guild.invites.fetch(invite.code);
			list.addField(`${invite.name}`, `${fetchedInvite.uses} uses | ${invite.code}`);
		}

		await interaction.editReply({ embeds: [ list ] });
	},
};