const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help with this bot\'s available commands')
		.addStringOption(option =>
			option
				.setName('command-name')
				.setDescription('Get help for a specific command')
				.addChoice('help', 'help')
				.addChoice('info', 'info')
				.addChoice('nade', 'nade')
				.addChoice('ping', 'ping'),
		),
	async execute(interaction) {
		const command_name = interaction.options.getString('command-name');
		if (command_name) {
			switch (command_name) {
			case 'help':
				await interaction.reply({ content: `Command: **help**
            Usage: **help** [command_name]
              _Get information about Gunther's commands_
            `, ephemeral: true });
				break;
			case 'info':
				await interaction.reply({ content: `Command: **info**
            Usage: **info user** [user]
              _Get information about a member of the current server_
            Usage: **info server**
              _Get information about the current server_
            `, ephemeral: true });
				break;
			case 'nade':
				await interaction.reply({ content: `Command: **nade**
            Usage: **nade** <nade-type> <team> <map> <callout>
              _Get a link to a nade throw_
            `, ephemeral:true });
				break;
			case 'ping':
				await interaction.reply({ content: `Command: **ping**
            Usage: **ping**
              _Get the bot's roundtrip latency in ms_
            `, ephemeral:true });
				break;
			}
		} else {
			await interaction.reply({ content: `Commands:
          **command_name** <required_parameter> [optional_parameter]
            _Command description_

          **help** [command_name]
            _Get information about Gunther's commands_
          **info user** [user]
            _Get information about a member of the current server_
          **info server**
            _Get information about the current server_
          **nade** <nade-type> <team> <map> <callout>
            _Get a link to a nade throw_
          **ping**
            _Get the bot's roundtrip latency in ms_
        `, ephemeral:true });
		}
	},
};
