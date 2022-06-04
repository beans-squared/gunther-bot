const logger = require('./../logger');

module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		// Slash command interactions
		if (interaction.isCommand()) {
			// Temporary restriction to developer only for all commands
			if (interaction.user.id != '240161761393639425') return interaction.reply({ content: 'Commands are currently restricted to developers of this application only.', ephemeral: true });

			logger.debug(`Command: /${interaction.commandName} has been executed by ${interaction.user.tag} in #${interaction.channel.name}`);

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				command.execute(interaction);
			} catch (error) {
				logger.error(error);
				interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
			}
		}
	},
};
