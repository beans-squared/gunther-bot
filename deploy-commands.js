const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');
const logger = require('./logger');

const commands = [];

const directories = fs.readdirSync('./commands/public', { withFileTypes: true }).filter(dirent => dirent.isDirectory());

for (const dir of directories) {
	const commandFiles = fs.readdirSync(`./commands/public/${dir.name}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/public/${dir.name}/${file}`);
		commands.push(command.data.toJSON());
	}
}

const commandFiles = fs.readdirSync('./commands/public').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/public/${file}`);
	commands.push(command.data.toJSON());
}


const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		logger.info('Started reloading application public slash commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		logger.info('Successfully reloaded application public slash commands.');
	} catch (error) {
		logger.error(error);
	}
})();