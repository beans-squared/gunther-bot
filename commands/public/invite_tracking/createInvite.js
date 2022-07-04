const { SlashCommandBuilder } = require('@discordjs/builders');
const { Invites } = require('../../../dbObjects');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('createinvite')
		.setDescription('Create an invite to the server.')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('The name of this invite.'),
		)
		.addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('The channel this invite is for.'),
		),
	async execute(interaction) {
		await interaction.deferReply();

		const name = (interaction.options.getString('name')) ? interaction.options.getString('name') : 'New Invite';
		const channel = (interaction.options.getChannel('channel')) ? interaction.options.getChannel('channel') : interaction.channel;

		const invite = await interaction.guild.invites.create(channel, { maxAge: 0, unique: true });

		await Invites.create({
			code: invite.code,
			name: name,
			uses: 0,
			guild_id: interaction.guild.id,
		});

		await interaction.editReply(`New invite created with name **${name}**.\nHere's the link to your invite: <${invite}>`);
	},
};