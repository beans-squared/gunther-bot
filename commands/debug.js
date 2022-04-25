const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('./../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('debug')
		.setDescription('Enable or disable debug output to the console.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('enable')
				.setDescription('Enable debug output'),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('disable')
				.setDescription('Disable debug output'),
		),
	async execute(interaction) {
		// Check if the executor is not beansquared#0666
		if (!(interaction.user.id === '240161761393639425')) {
			await interaction.reply('Access Denied: This command is restriced to the developer of this application only.');
			return;
		}

		if (interaction.options.getSubcommand() === 'enable') {
			logger.level = 'debug';
			logger.debug('Debug logging has been enabled.');
			await interaction.reply('Debug logging has been enabled.');
		} else {
			logger.debug('Debug logging has been disabled.');
			logger.level = 'info';
			await interaction.reply('Debug logging has been disabled.');
		}
	},
};