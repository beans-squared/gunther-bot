const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Get help with this bot\'s available commands')
		.addStringOption(option =>
			option
				.setName('command-name')
				.setDescription('Get help for a specific command')
				.addChoice('8ball', '8ball')
				.addChoice('avatar', 'avatar')
				.addChoice('coinflip', 'coinflip')
				.addChoice('decide', 'decide')
				.addChoice('diceroll', 'diceroll')
				.addChoice('help', 'help')
				.addChoice('info', 'info')
				.addChoice('nade', 'nade')
				.addChoice('ping', 'ping')
				.addChoice('rps', 'rps')
				.addChoice('uptime', 'uptime'),
		),
	async execute(interaction) {
		const command_name = interaction.options.getString('command-name');
		if (command_name) {
			switch (command_name) {
			case '8ball':
				await interaction.reply({ content: `Command: **8ball**
			Usage: **8ball** <question>
				_Ask ${interaction.client.user.username}'s magic 8-ball a question, and recieve a random yes/no type answer_
				`, ephemeral: true });
				break;
			case 'avatar':
				await interaction.reply({ content: `Command: **avatar**
			Usage: **avatar user** [user]
				_Request a link to a user's avatar_
			Usage: **avatar server**
				_Request a link to the current server's icon_
				`, ephemeral: true });
				break;
			case 'coinflip':
				await interaction.reply({ content: `Command: **coinflip**
			Usage: **coinflip**
				_Have ${interaction.client.user.username} flip a virtual coin for you_
				`, ephemeral: true });
				break;
			case 'decide':
				await interaction.reply({ content: `Command: **decide**
			Usage: **decide** <choice1> <choice2> [choice3] [choice4] [choice5] [choice6] [choice7] [choice8] [choice9] [choice10]
				_Have ${interaction.client.user.username} make difficult, life-changing decisions for you_
				`, ephemeral: true });
				break;
			case 'diceroll':
				await interaction.reply({ content: `Command: **diceroll**
			Usage: **diceroll** [number of dice] [die type]
				_Have ${interaction.client.user.username} roll some virtual dice for you and give you the total result_
				`, ephemeral: true });
				break;
			case 'help':
				await interaction.reply({ content: `Command: **help**
            Usage: **help** [command name]
              _Get information about ${interaction.client.user.username}'s commands_
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
            Usage: **nade** <nade type> <team> <map> <callout>
              _Get a link to a nade throw_
            `, ephemeral:true });
				break;
			case 'ping':
				await interaction.reply({ content: `Command: **ping**
            Usage: **ping**
              _Get the bot's roundtrip latency in ms_
            `, ephemeral:true });
				break;
			case 'rps':
				await interaction.reply({ content: `Command: **rps**
			Usage: **rps** <choice>
				_Play a round of Rock, Paper, Scissors with ${interaction.client.user.username}_
				`, ephemeral: true });
				break;
			case 'uptime':
				await interaction.reply({ content: `Command: **uptime**
			Usage: **uptime**
				_Get the amount of time the bot has been online_
				`, ephemeral: true });
				break;
			}
		} else {
			await interaction.reply({ content: `Commands:
        **command name** <required parameter> [optional parameter]
            _Command description_

		**8ball** <question>
		  	_Ask ${interaction.client.user.username}'s magic 8-ball a question, and recieve a random yes/no type answer_
		**avatar user**
			_Request a link to a user's avatar_
		**avatar server**
			_Request a link to the current server's icon_
		**coinflip**
			_Have ${interaction.client.user.username} flip a virtual coin for you_
		**decide** <choice1> <choice2> [choice3] [choice4] [choice5] [choice6] [choice7] [choice8] [choice9] [choice10]
			_Have ${interaction.client.user.username} make difficult, life-changing decisions for you_
		**diceroll** [number of dice] [die type]
			_Have ${interaction.client.user.username} roll some virtual dice for you and give you the total result_
        **help** [command name]
            _Get information about ${interaction.client.user.username}'s commands_
        **info user** [user]
            _Get information about a member of the current server_
        **info server**
            _Get information about the current server_
        **nade** <nade type> <team> <map> <callout>
            _Get a link to a nade throw_
        **ping**
            _Get the bot's roundtrip latency in ms_
		**rps** <choice>
			_Play a round of Rock, Paper, Scissors with ${interaction.client.user.username}_
		**uptime**
			_Get the amount of time the bot has been online_
        `, ephemeral:true });
		}
	},
};
