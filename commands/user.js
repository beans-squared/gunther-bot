const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Replies with user information"),
  async execute(interaction) {
    await interaction.reply(`**User name:** ${interaction.user.username}\n**User tag:** ${interaction.user.tag}\n**Account creation date:**  ${interaction.user.createdAt}`);
  },
};
