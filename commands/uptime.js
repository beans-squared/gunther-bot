const { SlashCommandBuilder } = require('@discordjs/builders');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uptime')
		.setDescription('Get how long the bot has been online'),
	async execute(interaction) {
		dayjs.extend(duration);
		const uptime = dayjs.duration(interaction.client.uptime).format('H:m:s');
		await interaction.reply(uptime);
	},
};