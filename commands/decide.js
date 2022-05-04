const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('./../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('decide')
		.setDescription('Let Gunther help you make tough, life-changing decisions')
		.addStringOption(option =>
			option
				.setName('choice1')
				.setDescription('Enter your first choice')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('choice2')
				.setDescription('Enter your second choice')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('choice3')
				.setDescription('Enter your third choice'),
		)
		.addStringOption(option =>
			option
				.setName('choice4')
				.setDescription('Enter your fourth choice'),
		)
		.addStringOption(option =>
			option
				.setName('choice5')
				.setDescription('Enter your fifth choice'),
		)
		.addStringOption(option =>
			option
				.setName('choice6')
				.setDescription('Enter your sixth choice'),
		)
		.addStringOption(option =>
			option
				.setName('choice7')
				.setDescription('Enter your seventh choice'),
		)
		.addStringOption(option =>
			option
				.setName('choice8')
				.setDescription('Enter your eighth choice'),
		)
		.addStringOption(option =>
			option
				.setName('choice9')
				.setDescription('Enter your ninth choice'),
		)
		.addStringOption(option =>
			option
				.setName('choice10')
				.setDescription('Enter your tenth choice'),
		),
	async execute(interaction) {
		const choices = [interaction.options.getString('choice1'), interaction.options.getString('choice2')];
		let numberOfChoices = 2;
		if (interaction.options.getString('choice3')) {
			choices[2] = interaction.options.getString('choice3');
			numberOfChoices++;
		}
		if (interaction.options.getString('choice4')) {
			choices[3] = interaction.options.getString('choice4');
			numberOfChoices++;
		}
		if (interaction.options.getString('choice5')) {
			choices[4] = interaction.options.getString('choice5');
			numberOfChoices++;
		}
		if (interaction.options.getString('choice6')) {
			choices[5] = interaction.options.getString('choice6');
			numberOfChoices++;
		}
		if (interaction.options.getString('choice7')) {
			choices[6] = interaction.options.getString('choice7');
			numberOfChoices++;
		}
		if (interaction.options.getString('choice8')) {
			choices[7] = interaction.options.getString('choice8');
			numberOfChoices++;
		}
		if (interaction.options.getString('choice9')) {
			choices[8] = interaction.options.getString('choice9');
			numberOfChoices++;
		}
		if (interaction.options.getString('choice10')) {
			choices[9] = interaction.options.getString('choice10');
			numberOfChoices++;
		}

		logger.debug('User choices entered:');
		for (const choice of choices) {
			logger.debug(choice);
		}

		const botChoice = Math.floor(Math.random() * numberOfChoices);

		switch (botChoice) {
		case 0:
			await interaction.reply(`I'd say just stick with **${interaction.options.getString('choice1')}**, it's your best option.`);
			break;
		case 1:
			await interaction.reply(`Personally, I think **${interaction.options.getString('choice2')}** is the better choice.`);
			break;
		case 2:
			await interaction.reply(`I think **${interaction.options.getString('choice3')}** is the way to go.`);
			break;
		case 3:
			await interaction.reply(`Hm, a tough one. Probably best to go with **${interaction.options.getString('choice4')}**.`);
			break;
		case 4:
			await interaction.reply(`Definitely go with **${interaction.options.getString('choice5')}**.`);
			break;
		case 5:
			await interaction.reply(`For sure, your best option is **${interaction.options.getString('choice6')}**.`);
			break;
		case 6:
			await interaction.reply(`**${interaction.options.getString('choice7')} seems like the way to go to me.**`);
			break;
		case 7:
			await interaction.reply(`Maybe go with **${interaction.options.getString('choice8')}**? That seems like the best choice to me.`);
			break;
		case 8:
			await interaction.reply(`Oh, one hundred percent **${interaction.options.getString('choice9')}**.`);
			break;
		case 9:
			await interaction.reply(`Trust me, go with **${interaction.options.getString('choice10')}**. You won't regret it.`);
			break;
		default:
			await interaction.reply('ERROR: invalid choice');
			break;
		}
	},
};