const { SlashCommandBuilder } = require('@discordjs/builders');
const { Invites } = require('../../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deleteinvite')
		.setDescription('Delete an invite.')
		.addStringOption(option =>
			option
				.setName('code')
				.setDescription('The code of the invite to delete.')
				.setRequired(true),
		),
	async execute(interaction) {
		const code = interaction.options.getString('code');

		const isDeleted = await Invites.destroy({
			where: {
				code: code,
				guild_id: interaction.guild.id,
			},
		});

		if (!isDeleted) return await interaction.reply({ content: 'No invite exists with that code.', ephemeral: true });

		return await interaction.reply('Invite successfully deleted.');
	},
};