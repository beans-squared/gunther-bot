const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip a virtual coin'),
	async execute(interaction) {
		const result = Math.floor(Math.random() * 2);

		switch (result) {
		case 0:
			await interaction.reply('It\'s **heads!**');
			break;
		case 1:
			await interaction.reply('It\'s **tails!**');
			break;
		}
	},
};