const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rps')
		.setDescription('Play a round of Rock, Paper, Scissors with Gunther')
		.addStringOption(option =>
			option
				.setName('choice')
				.setDescription('Choice Rock, Paper or Scissors')
				.setRequired(true)
				.addChoice('Rock', 'Rock')
				.addChoice('Paper', 'Paper')
				.addChoice('Scissors', 'Scissors'),
		),
	async execute(interaction) {
		const botChoice = Math.floor(Math.random() * 3);
		const userChoice = interaction.options.getString('choice');

		await interaction.reply(`You chose **${userChoice}**...`);
		await wait(2000);

		switch (botChoice) {
		// Rock
		case 0:
			if (userChoice === 'Rock') {
				await interaction.editReply('You chose **Rock**...\n...I chose **Rock.**\nIt\'s a _tie._');
			} else if (userChoice === 'Paper') {
				await interaction.editReply('You chose **Paper**...\n...I chose **Rock.**\nPaper covers Rock. _You win._');
			} else {
				await interaction.editReply('You chose **Scissors**...\n...I chose **Rock.**\nRock crushes Scissors. _I win!_');
			}
			break;
		// Paper
		case 1:
			if (userChoice === 'Rock') {
				await interaction.editReply('You chose **Rock**...\n...I chose **Paper.**\nPaper covers Rock. _I win!_');
			} else if (userChoice === 'Paper') {
				await interaction.editReply('You chose **Paper**...\n...I chose **Paper.**\nIt\'s a _tie._');
			} else {
				await interaction.editReply('You chose **Scissors**...\n...I chose **Paper.**\nScissors cut paper. _You win._');
			}
			break;
		// Scissors
		case 2:
			if (userChoice === 'Rock') {
				await interaction.editReply('You chose **Rock**...\n...I chose **Scissors.**\nRock crushes Scissors. _You win._');
			} else if (userChoice === 'Paper') {
				await interaction.editReply('You chose **Paper**...\n...I chose **Scissors**\nScissors cut paper. _I win!_');
			} else {
				await interaction.editReply('You chose **Scissors**...\n...I chose **Scissors**\nIt\'s a _tie._');
			}
			break;
		}
	},
};