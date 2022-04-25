const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Get how long the bot has been online'),
	async execute(interaction) {
		dayjs.extend(duration);
		const rawUptime = dayjs.duration(interaction.client.uptime);
		const uptimeHours = rawUptime.format('H');
		const uptimeMinutes = rawUptime.format('m');
		const uptimeSeconds = rawUptime.format('s');

		const uptime = inlineCode(`${uptimeHours}h:${uptimeMinutes}m:${uptimeSeconds}s`);
		await interaction.reply(uptime);
	},
};