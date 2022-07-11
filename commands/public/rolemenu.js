const { SlashCommandBuilder, inlineCode } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { ChannelType } = require('discord-api-types/v10');
const { RoleMenus } = require('../../dbObjects');
const logger = require('../../logger');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rolemenu')
		.setDescription('fuckyourshittyrequirementsdiscordjs')
		.addSubcommand(subcommand =>
			subcommand
				.setName('create')
				.setDescription('Create a new role menu.')
				.addStringOption(option =>
					option
						.setName('title')
						.setDescription('The title of the role menu. Must be unique.')
						.setRequired(true),
				)
				.addChannelOption(option =>
					option
						.setName('channel')
						.setDescription('The channel to post this role menu.')
						.addChannelTypes([
							ChannelType.GuildNews,
							ChannelType.GuildText,
						])
						.setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName('description')
						.setDescription('The description of the role menu.'),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('addrole')
				.setDescription('Add a role to an existing role menu.')
				.addStringOption(option =>
					option
						.setName('menu')
						.setDescription('The title of the role menu to add the role to.')
						.setRequired(true),
				)
				.addRoleOption(option =>
					option
						.setName('role')
						.setDescription('The role to add.')
						.setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName('description')
						.setDescription('The description of this role.')
						.setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName('emoji')
						.setDescription('The related emoji for this role.'),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('removerole')
				.setDescription('Remove a role from a role menu.')
				.addStringOption(option =>
					option
						.setName('menu')
						.setDescription('The title of the role menu you want to remove a role from.')
						.setRequired(true),
				)
				.addRoleOption(option =>
					option
						.setName('role')
						.setDescription('The role you want to remove.')
						.setRequired(true),
				),
		),
	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
		case 'create':
			return await this.createMenu(interaction);
		case 'addrole':
			return await this.addRole(interaction);
		case 'removerole':
			return await this.removeRole(interaction);
		}
	},

	async createMenu(interaction) {
		await interaction.deferReply();
		const title = interaction.options.getString('title');
		const channel = interaction.options.getChannel('channel');
		const description = interaction.options.getString('description');

		const existing_menu = await RoleMenus.findOne({
			where: {
				menu_title: title,
			},
		});

		if (existing_menu) return await interaction.editReply(`A role menu with name ${inlineCode(title)} already exists.`);

		const menu = new MessageEmbed()
			.setColor('BLURPLE')
			.setTitle(title);
		if (description) {
			menu.setDescription(description);
		} else {
			menu.setDescription(`This is your new role menu. When you add roles via the ${inlineCode('/rolemenu addrole')} command, you will see those roles appear in this menu.`);
		}

		const exampleButton = new MessageButton()
			.setCustomId('rickroll')
			.setEmoji('😄')
			.setLabel('Example Role Button')
			.setStyle('PRIMARY');

		const buttons = new MessageActionRow()
			.addComponents(exampleButton);

		await channel.send({ embeds: [ menu ], components: [ buttons ] });

		await RoleMenus.create({
			menu_title: title,
			channel_id: channel.id,
			message_id: channel.lastMessage.id,
			guild_id: interaction.guild.id,
		});

		return await interaction.editReply('Your role menu has been created.');
	},

	async addRole(interaction) {
		await interaction.deferReply();

		const menu = interaction.options.getString('menu');
		const role = interaction.options.getRole('role');
		const description = interaction.options.getString('description');
		const emoji = interaction.options.getString('emoji');

		const roleMenus = await RoleMenus.findAll({
			where: {
				guild_id: interaction.guild.id,
			},
		});

		let role_menu = '';
		for (const roleMenu of roleMenus) {
			if (roleMenu.menu_title === menu) {
				role_menu = roleMenu;
				break;
			}
			return interaction.editReply(`There is no role menu with title ${inlineCode(menu)}.`);
		}

		const channel = interaction.guild.channels.cache.find(element => element.id === role_menu.channel_id);
		const cache = await channel.messages.fetch();
		const message = cache.find(element => element.id === role_menu.message_id);

		const fieldValue = (emoji) ? `${emoji} ${role}` : `${role}`;
		const menuEmbed = new MessageEmbed(message.embeds[0])
			.addField(`${description}`, `${fieldValue}`, true);

		const roleButton = new MessageButton()
			.setCustomId(`togglerole:${role.id}`)
			.setLabel(role.name)
			.setStyle('PRIMARY');
		if (emoji) roleButton.setEmoji(emoji);

		const buttons = new MessageActionRow();

		for (const button of message.components[0].components) {
			if (button.customId === 'rickroll') continue;
			if (button.customId === roleButton.customId) return await interaction.editReply(`The role ${role} already has a button on this menu.`);
			buttons.addComponents(button);
		}

		buttons.addComponents(roleButton);

		await message.edit({ embeds: [ menuEmbed ], components: [ buttons ] });

		return await interaction.editReply(`Role ${role} added to menu ${inlineCode(menu)}.`);
	},

	async removeRole(interaction) {
		await interaction.deferReply();

		const menu = interaction.options.getString('menu');
		const role = interaction.options.getRole('role');

		const roleMenus = await RoleMenus.findAll({
			where: {
				guild_id: interaction.guild.id,
			},
		});

		let role_menu = '';
		for (const roleMenu of roleMenus) {
			if (roleMenu.menu_title === menu) {
				role_menu = roleMenu;
				break;
			}
		}

		const channel = interaction.guild.channels.cache.find(element => element.id === role_menu.channel_id);
		const cache = await channel.messages.fetch();
		const message = cache.find(element => element.id === role_menu.message_id);

		const menuEmbed = new MessageEmbed(message.embeds[0]);
		const buttons = new MessageActionRow();

		for (const row of message.components) {
			for (const button of row.components) {
				if (button.label === role.name) continue;
				buttons.addComponents(button);
			}
		}

		const newMenuEmbed = new MessageEmbed()
			.setColor(menuEmbed.color)
			.setTitle(menuEmbed.title)
			.setDescription(menuEmbed.description);

		for (const field of menuEmbed.fields) {
			if (field.value === `<@&${role.id}>`) continue;
			newMenuEmbed.addField(field.name, field.value, field.inline);
		}

		if (buttons.components.length === 0) {
			const exampleButton = new MessageButton()
				.setCustomId('rickroll')
				.setEmoji('😄')
				.setLabel('Example Role Button')
				.setStyle('PRIMARY');
			buttons.addComponents(exampleButton);
		}
		await message.edit({ embeds: [ newMenuEmbed ], components: [ buttons ] });

		return await interaction.editReply(`Role ${role} has been removed from menu ${inlineCode(menu)}.`);
	},

	async deleteRoleMenu(message) {
		const deleted = await RoleMenus.destroy({
			where: {
				guild_id: message.guild.id,
				message_id: message.id,
			},
		});
		if (deleted) logger.debug(`A role menu was deleted in #${message.channel.name}.`);
	},
};