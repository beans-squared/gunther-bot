const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("Replies with server information"),
  async execute(interaction) {
    await interaction.reply(`**Server name:** ${interaction.guild.name}\n**Number of members:** ${interaction.guild.memberCount} out of ${interaction.guild.maximumMembers} possible members\n**Server creation date:** ${interaction.guild.createdAt}\n**Server description:** ${interaction.guild.description}\n**Server partner status:** ${interaction.guild.partnered}\n**Server verification status:** ${interaction.guild.verified}`);
  },
};
