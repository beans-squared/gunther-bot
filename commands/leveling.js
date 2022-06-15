const { SlashCommandBuilder } = require('@discordjs/builders');
const { GuildMembers } = require('../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('leveling')
		.setDescription('Configure the Leveling suite.')
		.addSubcommand(subcommand =>
			subcommand
				.setName('xp')
				.setDescription('Check a member\'s xp level for the current server.')
				.addUserOption(option =>
					option
						.setName('member')
						.setDescription('The member you wish check the experience of.'),
				),
		),
	async execute(interaction) {
		const subcommand = interaction.options.getSubcommand();
		if (subcommand === 'xp') {
			const member = interaction.options.getUser('member');
			if (member) {
				const query = await GuildMembers.findOne({ where: { user_id: member.id, guild_id: interaction.guild.id } });
				if (!query) await interaction.reply('User not found or does not have any xp in this guild yet.');
				await interaction.reply(`${member} has ${query.xp}xp in this guild.`);
			} else {
				const query = await GuildMembers.findOne({ where: { user_id: interaction.member.id, guild_id: interaction.guild.id } });
				await interaction.reply(`You have ${query.xp}xp in this guild.`);
			}
		} else if (subcommand === 'toggle') {
			await interaction.reply('Command is a WIP.');
		}
	},
};