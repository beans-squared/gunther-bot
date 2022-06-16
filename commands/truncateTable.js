const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');
const { GuildMembers, Guilds, Logging, WelcomeMessages } = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('truncatetable')
		.setDescription('Truncate a table\'s contents.')
		.addStringOption(option =>
			option
				.setName('tablename')
				.setDescription('Name of the table to truncate.')
				.addChoice('GuildMembers', 'GuildMembers')
				.addChoice('Guilds', 'Guilds')
				.addChoice('Logging', 'Logging')
				.addChoice('WelcomeMessages', 'WelcomeMessages'),
		),
	async execute(interaction) {
		if (interaction.user.id != '240161761393639425') return await interaction.reply({ content: 'This command is restricted to the developer of this application only.', ephemeral: true });

		switch (interaction.options.getString('tablename')) {
		case 'GuildMembers':
			await GuildMembers.destroy({ truncate: true });
			await interaction.reply(`Table ${inlineCode('GuildMembers')} has been truncated.`);
			break;
		case 'Guilds':
			await Guilds.destroy({ truncate: true });
			await interaction.reply(`Table ${inlineCode('Guilds')} has been truncated.`);
			break;
		case 'Logging':
			await Logging.destroy({ truncate: true });
			await interaction.reply(`Table ${inlineCode('Logging')} has been truncated.`);
			break;
		case 'WelcomeMessages':
			await WelcomeMessages.destroy({ truncate: true });
			await interaction.reply(`Table ${inlineCode('WelcomeMessages')} has been truncated.`);
			break;
		}
	},
};