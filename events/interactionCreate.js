const logger = require('./../logger');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		if (interaction.isCommand()) {
			logger.debug(`Command: /${interaction.commandName} has been executed by ${interaction.user.tag} in #${interaction.channel.name}`);

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				command.execute(interaction);
			} catch (error) {
				logger.error(error);
				interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
			}
		} else if (interaction.isButton()) {
			if (interaction.customId.startsWith('togglerole:')) {
				const roleId = interaction.customId.substring(11);

				const hasRole = interaction.member.roles.cache.has(roleId);
				if (hasRole) {
					await interaction.member.roles.remove(roleId, 'Member removed role using a role menu.');
					return interaction.reply({ content: 'You have been removed from this role.', ephemeral: true });
				} else {
					await interaction.member.roles.add(roleId, 'Member added role using a role menu.');
					return interaction.reply({ content: 'You have been added to this role.', ephemeral: true });
				}
			} else if (interaction.customId.startsWith('rickroll')) {
				await interaction.deferReply();
				await interaction.editReply({ files: [ 'https://media1.tenor.com/images/23aeaaa34afd591deee6c163c96cb0ee/tenor.gif?itemid=7220603' ] });
			}
		}
	},
};
