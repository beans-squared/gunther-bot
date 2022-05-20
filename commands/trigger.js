const { inlineCode, SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('trigger')
		.setDescription('Manually trigger an event')
		.addStringOption(option =>
			option
				.setName('event')
				.setDescription('The name of the event to trigger')
				.setRequired(true)
				.addChoices([
					[ 'guildMemberAdd', 'guildMemberAdd' ],
					[ 'guildMemberRemove', 'guildMemberRemove' ],
				]),
		),
	async execute(interaction) {
		const input = interaction.options.getString('event');
		if (input === 'guildMemberAdd') {
			const event = require('./../events/guildMemberAdd');
			event.execute(interaction.member);
			await interaction.reply(`Event: ${inlineCode(event.name)} was executed.`);
		} else if (input === 'guildMemberRemove') {
			const event = require('./../events/guildMemberRemove');
			event.execute(interaction.member);
			await interaction.reply(`Event: ${inlineCode(event.name)} was executed.`);
		}
	},
};