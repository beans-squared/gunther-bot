const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('diceroll')
		.setDescription('Roll a die or dice and get the total')
		.addIntegerOption(option =>
			option
				.setName('number-of-dice')
				.setDescription('Set the number of dice you want to roll'),
		)
		.addIntegerOption(option =>
			option
				.setName('die-type')
				.setDescription('Select the types of dice being cast')
				.addChoice('d4', 4)
				.addChoice('d6', 6)
				.addChoice('d8', 8)
				.addChoice('d10', 10)
				.addChoice('d12', 12)
				.addChoice('d20', 20),
		),
	async execute(interaction) {
		let numberOfDice = interaction.options.getInteger('number-of-dice');
		let dieType = interaction.options.getInteger('die-type');

		if (numberOfDice > 20) {
			interaction.reply('Whoa there! No more than 20 dice at a time, please.');
		} else {

			if (numberOfDice === null) {
				numberOfDice = 1;
			}
			if (dieType === null) {
				dieType = 6;
			}

			let result = 0;
			for (let i = 0; i < numberOfDice; i++) {
				const d = Math.floor((Math.random() * dieType) + 1);
				result = result + d;
			}

			interaction.reply(`Counting them all up, that's **${result}!**`);
		}
	},
};