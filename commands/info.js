const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Request information about a user or server")
    .addSubcommand(subcommand =>
      subcommand
        .setName("user")
        .setDescription("Request information about a user")
        .addUserOption(option =>
          option
            .setName("target")
            .setDescription("The user to request information of")
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("server")
        .setDescription("Request information about a server")
    ),
  async execute(interaction){
    switch(interaction.options.getSubcommand()){
      case "user":
        const user = interaction.options.getUser("target");
        if (user) {
          await interaction.reply(`**User name:** ${user.username}\n**User tag:** ${user.tag}\n**Account creation date:**  ${user.createdAt}`);
        } else {
          await interaction.reply(`**User name:** ${interaction.user.username}\n**User tag:** ${interaction.user.tag}\n**Account creation date:**  ${interaction.user.createdAt}`);
        }
        break;
      case "server":
        await interaction.reply(`**Server name:** ${interaction.guild.name}\n**Number of members:** ${interaction.guild.memberCount} out of ${interaction.guild.maximumMembers} possible members\n**Server creation date:** ${interaction.guild.createdAt}\n**Server description:** ${interaction.guild.description}\n**Server partner status:** ${interaction.guild.partnered}\n**Server verification status:** ${interaction.guild.verified}`);
        break;
    }
  },
};
