const { SlashCommandBuilder } = require('@discordjs/builders');
// const application = require('./../index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('View a user\'s balance'),
	async execute(interaction) {
		await interaction.reply(`${interaction.user.tag} has ${application.currency.getBalance(interaction.user.id)} balance`);
	},
};