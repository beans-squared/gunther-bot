const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');
const { Logging } = require('../dbObjects');

const logger = require('./../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('logging')
		.setDescription('Configure the Logging suite.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('channel')
				.setDescription('Define a log channel for your server.')
				.addChannelOption(option =>
					option
						.setName('channel')
						.setDescription('Specify the channel name')
						.addChannelType(0)
						.addChannelType(5)
						.setRequired(true),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('toggle')
				.setDescription('Toggle logging on or off.'),
		),
	async execute(interaction) {
		if (!interaction.inGuild()) return await interaction.reply({ content: 'This command can only be run in a server text channel.', ephemeral: true });

		const subCommand = interaction.options.getSubcommand();
		if (subCommand === 'channel') {
			const channel = interaction.options.getChannel('channel');

			const affectedRows = await Logging.update({ logChannel: channel.id }, { where: { guild_id: interaction.guild.id } });
			if (affectedRows > 0) {
				logger.debug('Guild found in database. Updated log channel.');
				return await interaction.reply('Your server\'s log channel was updated successfully.');
			}

			logger.debug('Guild not found in database. Created new entry and defined log channel.');

			await Logging.create({
				guild_id: interaction.guild.id,
				enabled: true,
				logChannel: channel.id,
			});

			return await interaction.reply('Your server\'s log channel was updated successfully.');
		} else if (subCommand === 'toggle') {
			const suiteState = await Logging.findOne({ where: { guild_id: interaction.guild.id } });
			if (suiteState) {
				logger.debug(`Logging state found for guild (${suiteState.guild_id}). State: ${suiteState.enabled}`);
				if (suiteState.enabled) {
					logger.debug('Logging was enabled. Disabling.');
					Logging.update({ enabled: 0 }, { where: { guild_id: interaction.guild.id } });
					return await interaction.reply('Logging has been disabled.');
				} else {
					logger.debug('Logging was disabled. Enabling.');
					Logging.update({ enabled: 1 }, { where: { guild_id: interaction.guild.id } });
					return await interaction.reply('Logging has been enabled.');
				}
			}

			return await interaction.reply(`You need to declare a log channel before you can toggle the logging suite on. You can do this with the ${inlineCode('/logging channel')} command.`);
		}
	},
};