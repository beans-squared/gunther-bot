const { MessageEmbed } = require('discord.js');
const { Logging } = require('../dbObjects');
const { inlineCode } = require('@discordjs/builders');

const logger = require('../logger');

module.exports = {
	// Helper functions
	async createLogWithIcon(channel, color, message, type, icon) {
		const log = new MessageEmbed()
			.setColor(color)
			.setDescription(message)
			.setFooter({ text: type, iconURL: icon })
			.setTimestamp();
		await channel.send({ embeds: [ log ] });
	},
	async createLog(channel, color, message, type) {
		const log = new MessageEmbed()
			.setColor(color)
			.setDescription(message)
			.setFooter({ text: type })
			.setTimestamp();
		await channel.send({ embeds: [ log ] });
	},
	async isLoggingEnabled(guild) {
		const state = await Logging.findOne({ where: { guild_id: guild.id } });
		return state.enabled;
	},
	async isLoggingChannelDefined(guild) {
		const query = await Logging.findOne({ where: { guild_id: guild.id } });
		if (query) {
			const channel = guild.channels.cache.find(element => element.id === query.logChannel);
			if (channel) {
				return channel;
			}
		}
		this.logNoDefinedLogChannelWarning(guild);
		return null;
	},
	async logNoDefinedLogChannelWarning(guild) {
		const log = new MessageEmbed()
			.setColor('DARK_RED')
			.setDescription(`⚠️WARNING: Gunther attempted to post a log message, but your server has no log channel defined.\nYou can define a log channel using the ${inlineCode('/logging channel')} command.`)
			.setFooter({ text: 'NoDefinedLogChannelWarning' })
			.setTimestamp();
		guild.channels.cache.first().send({ embeds: [ log ] });
	},
	async logMissingDefinedLogChannelWarning(guild) {
		const log = new MessageEmbed()
			.setColor('DARK_RED')
			.setDescription('⚠️WARNING: Gunther attempted to post a log message, but your defined log channel no longer appears to exist. Maybe it was deleted by accident?')
			.setFooter({ text: 'MissingDefinedLogChannelWarning' })
			.setTimestamp();
		guild.channels.cache.first().send({ embeds: [ log ] });
	},

	// Events
	async logChannelCreate(channel) {
		if (channel.type !== 'GUILD_TEXT' && channel.type !== 'GUILD_VOICE' && channel.type !== 'GUILD_NEWS' && channel.type !== 'GUILD_STAGE_VOICE') return;

		if (!await this.isLoggingEnabled(channel.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(channel.guild);
		if (logChannel) {
			let channelType = channel.type;
			switch (channelType) {
			case 'GUILD_TEXT':
				channelType = 'Text';
				break;
			case 'GUILD_VOICE':
				channelType = 'Voice';
				break;
			case 'GUILD_NEWS':
				channelType = 'News';
				break;
			case 'GUILD_STAGE_VOICE':
				channelType = 'Stage';
				break;
			default:
				channelType = 'wack ass channel type that u ain\'t supposed to be able to get';
				break;
			}

			if (channel.parent) return this.createLog(logChannel, 'AQUA', `✨ ${channelType} channel ${channel} was created under category ${channel.parent}`, 'Channel Creation');
			return this.createLog(logChannel, 'AQUA', `✨ ${channelType} channel ${channel} was created.`, 'Channel Creation');
		}

		return this.logMissingDefinedLogChannelWarning(channel.guild);
	},

	async logChannelDelete(channel) {
		if (channel.type === 'DM') return;

		if (!await this.isLoggingEnabled(channel.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(channel.guild);
		if (logChannel) {
			if (channel.parent) return this.createLog(logChannel, 'DARK_AQUA', `🗑️ Channel #${channel.name} was deleted from category ${channel.parent}`, 'Channel Deletion');
			return this.createLog(logChannel, 'DARK_AQUA', `🗑️ Channel #${channel.name} was deleted.`, 'Channel Deletion');
		}

		return this.logMissingDefinedLogChannelWarning(channel.guild);
	},

	async logChannelPinsUpdate(channel, time) {
		return channel, time;
	},

	async logChannelUpdate(oldChannel, newChannel) {
		if (newChannel.type === 'DM') return;

		if (!await this.isLoggingEnabled(newChannel.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(newChannel.guild);
		if (logChannel) {
			if (newChannel.parent) {
				if (newChannel.name !== oldChannel.name) return this.createLog(logChannel, 'AQUA', `💫 Channel #${oldChannel.name} had its name changed to ${newChannel} in category ${newChannel.parent}`, 'Channel Update');
				return this.createLog(logChannel, 'AQUA', `💫 ${newChannel} was updated in category ${newChannel.parent}`, 'Channel Update');
			}
			if (newChannel.name !== oldChannel.name) return this.createLog(logChannel, 'AQUA', `💫 Channel #${oldChannel.name} had its name changed to ${newChannel}`, 'Channel Update');
			return this.createLog(logChannel, 'AQUA', `💫 ${newChannel} was updated.`, 'Channel Update');
		}

		return this.logMissingDefinedLogChannelWarning(newChannel.guild);
	},

	async logEmojiCreate(emoji) {
		if (!await this.isLoggingEnabled(emoji.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(emoji.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'LUMINOUS_VIVID_PINK', `Emoji <${emoji.identifier}> (${emoji.name}) was uploaded to the server by ${await emoji.fetchAuthor()}.`, 'Emoji Upload');
		}

		return this.logMissingDefinedLogChannelWarning(emoji.guild);
	},

	async logEmojiDelete(emoji) {
		if (!await this.isLoggingEnabled(emoji.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(emoji.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'LUMINOUS_VIVID_PINK', `Emoji <${emoji.identifier}> (${emoji.name}) was deleted from the server.`, 'Emoji Deletion');
		}

		return this.logMissingDefinedLogChannelWarning(emoji.guild);
	},

	async logEmojiUpdate(oldEmoji, newEmoji) {
		if (!await this.isLoggingEnabled(newEmoji.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(newEmoji.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'LUMINOUS_VIVID_PINK', `Emoji <${oldEmoji.identifier}> (${oldEmoji.name}) had its name changed to (${newEmoji.name}).`, 'Emoji Update');
		}

		return this.logMissingDefinedLogChannelWarning(newEmoji.guild);
	},

	async logError(error) {
		logger.error(error);
	},

	async logGuildBanAdd(ban) {
		if (!await this.isLoggingEnabled(ban.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(ban.guild);
		if (logChannel) {
			return await this.createLog(logChannel, 'ORANGE', `⚖️ ${ban.user} was banned from the server.`, 'Member Ban');
		}

		return await this.logMissingDefinedLogChannelWarning(ban.guild);
	},

	async logGuildBanRemove(ban) {
		if (!await this.isLoggingEnabled(ban.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(ban.guild);
		if (logChannel) {
			return await this.createLog(logChannel, 'ORANGE', `⚖️ ${ban.user}'s ban in this server was revoked.`, 'Member Unban');
		}

		return await this.logMissingDefinedLogChannelWarning(ban.guild);
	},

	async logGuildCreate(guild) {
		return guild;
	},

	async logGuildDelete(guild) {
		return guild;
	},

	async logGuildIntegrationsUpdate(guild) {
		if (!await this.isLoggingEnabled(guild)) return;

		const logChannel = await this.isLoggingChannelDefined(guild);
		if (logChannel) {
			return await this.createLog(logChannel, 'BLURPLE', '🧩 Server integrations were updated.', 'Server Integrations Update');
		}

		return this.logMissingDefinedLogChannelWarning(guild);
	},

	async logGuildMemberAdd(member) {
		if (!await this.isLoggingEnabled(member.guild)) return;

		logger.debug(`User: ${member.user.tag} (${member.user.id}) has joined guild: ${member.guild} (${member.guild.id})`);

		const logChannel = await Logging.findOne({ where: { guild_id: member.guild.id } });
		if (logChannel) {
			const channel = await member.guild.channels.cache.find(element => element.id === logChannel.logChannel);
			if (channel) {
				return this.createLog(channel, 'DARK_GREEN', `📥 ${member} has joined the server.`, 'User Join');
			}

			return this.createLog(member.guild.channels.cache.first(), 'RED', '⚠️WARNING: Gunther attempted to post a log message, but your defined log channel no longer appears to exist. Maybe it was deleted by accident?', 'System Warning');
		}

		const channel = await member.guild.channels.cache.first();
		return this.createLog(channel, 'RED', `⚠️WARNING: Gunther attempted to post a log message, but your server has no log channel defined.\nYou can define a log channel using the ${inlineCode('/logging channel')} command.`, 'System Warning');
	},

	async logGuildMemberAvailable(member) {
		return member;
	},

	async logGuildMemberRemove(member) {
		if (!await this.isLoggingEnabled(member.guild)) return;

		logger.debug(`User: ${member.user.tag} (${member.user.id}) has left guild: ${member.guild} (${member.guild.id})`);

		const logChannel = await Logging.findOne({ where: { guild_id: member.guild.id } });
		if (logChannel) {
			const channel = member.guild.channels.cache.find(element => element.id === logChannel.logChannel);
			if (channel) {
				return this.createLog(channel, 'ORANGE', `📤 ${member} has left the server.`, 'User Leave');
			}

			return this.createLog(member.guild.channels.cache.first(), 'RED', '⚠️WARNING: Gunther attempted to post a log message, but your defined log channel no longer appears to exist. Maybe it was deleted by accident?', 'System Warning');
		}

		return this.createLog(member.guild.channels.cache.first(), 'RED', `⚠️WARNING: Gunther attempted to post a log message, but your server has no log channel defined.\nYou can define a log channel using the ${inlineCode('/logging channel')} command.`, 'System Warning');
	},

	async logGuildMembersChunk(members, guild, chunk) {
		return members, guild, chunk;
	},

	async logGuildMemberUpdate(oldMember, newMember) {
		return oldMember, newMember;
	},

	async logGuildScheduledEventCreate(guildScheduledEvent) {
		if (!await this.isLoggingEnabled(guildScheduledEvent.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(guildScheduledEvent.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'GOLD', `🗓️ A scheduled event **${guildScheduledEvent.name}** was created.\n${guildScheduledEvent}`, 'Scheduled Event Creation');
		}

		return this.logMissingDefinedLogChannelWarning(guildScheduledEvent.guild);
	},

	async logGuildScheduledEventDelete(guildScheduledEvent) {
		if (!await this.isLoggingEnabled(guildScheduledEvent.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(guildScheduledEvent.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'GOLD', `🗓️ A scheduled event **${guildScheduledEvent.name}** was deleted.`, 'Scheduled Event Deletion');
		}

		return this.logMissingDefinedLogChannelWarning(guildScheduledEvent.guild);
	},

	async logGuildScheduledEventUpdate(oldGuildScheduledEvent, newGuildScheduledEvent) {
		if (!await this.isLoggingEnabled(newGuildScheduledEvent.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(newGuildScheduledEvent.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'GOLD', `🗓️ A scheduled event **${newGuildScheduledEvent.name}** was updated.\n${newGuildScheduledEvent}`, 'Scheduled Event Update');
		}

		return this.logMissingDefinedLogChannelWarning(newGuildScheduledEvent.guild);
	},

	async logGuildScheduledEventUserAdd(guildScheduledEvent, user) {
		return guildScheduledEvent, user;
	},

	async logGuildScheduledEventUserRemove(guildScheduledEvent, user) {
		return guildScheduledEvent, user;
	},

	async logGuildUnavailable(guild) {
		return guild;
	},

	async logGuildUpdate(oldGuild, newGuild) {
		if (!await this.isLoggingEnabled(newGuild)) return;

		const logChannel = await this.isLoggingChannelDefined(newGuild);
		if (logChannel) {
			return this.createLog(logChannel, 'BLURPLE', '⚙️ Server settings have been updated.', 'Server Update');
		}

		return this.logMissingDefinedLogChannelWarning(newGuild);
	},

	async logInteractionCreate(interaction) {
		return interaction;
	},

	async logInviteCreate(invite) {
		if (!await this.isLoggingEnabled(invite.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(invite.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'BLURPLE', `📨 A new invite for channel ${invite.channel} was created by ${invite.inviter}.\n<${invite}>`, 'Invite Create');
		}

		return this.logMissingDefinedLogChannelWarning(invite.guild);
	},

	async logInviteDelete(invite) {
		if (!await this.isLoggingEnabled(invite.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(invite.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'BLURPLE', `📨 An invite was deleted.\n<${invite}>`, 'Invite Delete');
		}

		return this.logMissingDefinedLogChannelWarning(invite.guild);
	},

	async logMessageCreate(message) {
		return message;
	},

	async logMessageDelete(message) {
		return message;
	},

	async logMessageDelteBulk(messages) {
		return messages;
	},

	async logMessageReactionAdd(messageReaction, user) {
		return messageReaction, user;
	},

	async logMessageReactionRemove(messageReaction, user) {
		return messageReaction, user;
	},

	async logMessageReactionRemoveAll(message, reactions) {
		return message, reactions;
	},

	async logMessageReactionRemoveEmoji(reaction) {
		return reaction;
	},

	async logMessageUpdate(oldMessage, newMessage) {
		return oldMessage, newMessage;
	},

	async logPresenceUpdate(oldPresence, newPresence) {
		return oldPresence, newPresence;
	},

	async logRateLimit(rateLimitData) {
		return rateLimitData;
	},

	async logRoleCreate(role) {
		if (!await this.isLoggingEnabled(role.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(role.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'RED', `🛡️ A new role ${role} was created.`, 'Role Create');
		}

		return this.logMissingDefinedLogChannelWarning(role.guild);
	},

	async logRoleDelete(role) {
		if (!await this.isLoggingEnabled(role.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(role.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'RED', `🛡️ A role **@${role.name}** was deleted.`, 'Role Delete');
		}

		return this.logMissingDefinedLogChannelWarning(role.guild);
	},

	async logRoleUpdate(oldRole, newRole) {
		if (!await this.isLoggingEnabled(newRole.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(newRole.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'RED', `🛡️ A role ${newRole} was updated.`, 'Role Update');
		}

		return this.logMissingDefinedLogChannelWarning(newRole.guild);
	},

	async logStageInstanceCreate(stageInstance) {
		return stageInstance;
	},

	async logStageInstanceDelete(stageInstance) {
		return stageInstance;
	},

	async logStageInstanceUpdate(oldStageInstance, newStageInstance) {
		return oldStageInstance, newStageInstance;
	},

	async logStickerCreate(sticker) {
		if (!await this.isLoggingEnabled(sticker.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(sticker.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'PURPLE', `🖼️ A sticker **${sticker.name}** was created.`, 'Sticker Create');
		}

		return this.logMissingDefinedLogChannelWarning(sticker.guild);
	},

	async logStickerDelete(sticker) {
		if (!await this.isLoggingEnabled(sticker.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(sticker.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'PURPLE', `🖼️ A sticker **${sticker.name}** was deleted.`, 'Sticker Delete');
		}

		return this.logMissingDefinedLogChannelWarning(sticker.guild);
	},

	async logStickerUpdate(oldSticker, newSticker) {
		if (!await this.isLoggingEnabled(newSticker.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(newSticker.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'PURPLE', `🖼️ A sticker **${newSticker.name}** was updated.`, 'Sticker Update');
		}

		return this.logMissingDefinedLogChannelWarning(newSticker.guild);
	},

	async logThreadCreate(thread) {
		if (!await this.isLoggingEnabled(thread.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(thread.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'NAVY', `🧵 A thread ${thread} has been created in parent channel ${thread.parent}.`, 'Thread Create');
		}

		return this.logMissingDefinedLogChannelWarning(thread.guild);
	},

	async logThreadDelete(thread) {
		if (!await this.isLoggingEnabled(thread.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(thread.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'NAVY', `🧵 A thread **${thread.name}** has been deleted.`, 'Thread Delete');
		}

		return this.logMissingDefinedLogChannelWarning(thread.guild);
	},

	async logThreadListSync(threads) {
		return threads;
	},

	async logThreadMembersUpdate(oldMembers, newMembers) {
		return oldMembers, newMembers;
	},

	async logThreadMemberUpdate(oldMember, newMember) {
		return oldMember, newMember;
	},

	async logThreadUpdate(oldThread, newThread) {
		if (!await this.isLoggingEnabled(newThread.guild)) return;

		const logChannel = await this.isLoggingChannelDefined(newThread.guild);
		if (logChannel) {
			return this.createLog(logChannel, 'NAVY', `🧵 A thread ${newThread} was updated.`, 'Thread Update');
		}

		return this.logMissingDefinedLogChannelWarning(newThread.guild);
	},

	async logTypingStart(typing) {
		return typing;
	},

	async logUserUpdate(oldUser, newUser) {
		return oldUser, newUser;
	},

	async logVoiceStateUpdate(oldState, newState) {
		return oldState, newState;
	},

	async logWarn(warn) {
		logger.warn(warn);
	},

	async logWebhookUpdate(channel) {
		return channel;
	},
};