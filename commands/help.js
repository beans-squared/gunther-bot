const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help with this bot\'s available commands'),

	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });

		const commands = await interaction.client.application.commands.fetch();

		let helpMessage = '';
		commands.forEach(async command => {
			let params = '';
			for (const option of command.options) {
				let param = '';
				if (option.required) {
					param = `<${option.name}>`;
				} else {
					param = `[${option.name}]`;
				}
				params += param + ' ';
			}
			helpMessage += `**${inlineCode(command.name)}** ${params}\n    _${command.description}_\n\n`;
		});

		await interaction.editReply({ content: helpMessage, ephemeral: true });
	},
};
