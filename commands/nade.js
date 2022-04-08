const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nade")
    .setDescription("Get nade lineups for CS:GO")
    .addStringOption(option =>
      option
        .setName("nade-type")
        .setDescription("Specify which type of nade throw you want")
        .setRequired(true)
        .addChoice("Smoke", "smoke")
        .addChoice("Molotov", "molly")
        .addChoice("Flashbang", "flash")
        .addChoice("Grenade", "frag")
    )
    .addStringOption(option =>
      option
        .setName("team")
        .setDescription("Specify which team side you want the lineup for")
        .setRequired(true)
        .addChoice("Terrorist (T)", "t")
        .addChoice("Counter-Terrorist (CT)", "ct")
    )
    .addStringOption(option =>
      option
        .setName("map")
        .setDescription("Specify which map you want a lineup for")
        .setRequired(true)
        .addChoice("Inferno", "inferno")
        .addChoice("Mirage", "mirage")
        .addChoice("Nuke", "nuke")
        .addChoice("Overpass", "overpass")
        .addChoice("Dust II", "dust2")
        .addChoice("Vertigo", "vertigo")
        .addChoice("Ancient", "ancient")
        .addChoice("Cache", "cache")
        .addChoice("Train", "train")
    )
    .addStringOption(option =>
      option
        .setName("callout")
        .setDescription("Specify the area you want to nade using the callout")
        .setRequired(true)
        /* Mirage -------------------------------------------------------------- */
        .addChoice("Apps", "apps")
        .addChoice("Arches", "arches")
        .addChoice("B Default", "bdefault")
        .addChoice("Bench", "bench")
        .addChoice("Catwalk", "cat")
        .addChoice("Chair", "chair")
        .addChoice("Connector", "con")
        .addChoice("Jungle", "jungle")
        .addChoice("Left Arches", "leftarches")
        .addChoice("Market Door", "marketdoor")
        .addChoice("Market Window", "marketwindow")
        .addChoice("Palace", "palace")
        .addChoice("Ramp", "ramp")
        .addChoice("Sandwich", "sandwich")
        .addChoice("Short", "short")
        .addChoice("Stairs", "stairs")
        .addChoice("Tetris", "tetris")
        .addChoice("Ticket Booth", "ticketbooth")
        .addChoice("Top Mid", "topmid")
        .addChoice("Window", "window")
        .addChoice("Van", "van")
    ),
  async execute(interaction){
    const nadeType = interaction.options.getString("nade-type");
    const team = interaction.options.getString("team");
    const map = interaction.options.getString("map");
    const calloutPosition = interaction.options.getString("callout");

    if(nadeType === "smoke") {
      if(team === "t"){
        switch(map){
          case "inferno":
            // TODO
            await interaction.reply("Inferno is not supported yet");
            break;
          case "mirage":
            switch(calloutPosition){
              case "apps":
                await interaction.reply("From _Apartment_: https://www.csgonades.com/nades/mirage-apps-window-smoke");
                break;
              case "arches":
                await interaction.reply("From _Back Alley_: https://www.csgonades.com/nades/mirage-smoke-arches-from-back-alley");
                break;
              case "bdefault":
                await interaction.reply("From _Back Alley_: https://www.csgonades.com/nades/mirage-b-default-smoke");
                break;
              case "bench":
                await interaction.reply("From _Back Alley_: https://www.csgonades.com/nades/mirage-smoke-bench-from-back-alley");
                break;
              case "cat":
                await interaction.reply("From _Top Mid_: https://www.csgonades.com/nades/smoke-short-from-top-mid");
                break;
              case "chair":
                await interaction.reply("No smokes available for Chair.");
                break;
              case "con":
                await interaction.reply("From _T Spawn_: https://www.csgonades.com/nades/smoke-connector-from-apps-ramp");
                break;
              case "jungle":
                await interaction.reply("From _T Roof_: https://www.csgonades.com/nades/mirage-jungle-connector-smoke");
                break;
              case "leftarches":
                await interaction.reply("From _Back Alley_: https://www.csgonades.com/nades/mirage-smoke-arches-from-back-alley-fbG");
                break;
              case "marketdoor":
                await interaction.reply("From _Back Alley_: https://www.csgonades.com/nades/mirage-smoke-market-doors-from-back-alley");
                break;
              case "marketwindow":
                await interaction.reply("From _Back Alley_: https://www.csgonades.com/nades/smoke-market-window-from-back-alley");
                break;
              case "palace":
                await interaction.reply("From _Side Alley_: https://www.csgonades.com/nades/mirage-palace-smoke-4");
                break;
              case "ramp":
                await interaction.reply("No smokes available for Ramp.");
                break;
              case "sandwich":
                await interaction.reply("No smokes available for Sandwich.");
                break;
              case "short":
                await interaction.reply("From _Back Alley_: https://www.csgonades.com/nades/mirage-smoke-b-short-from-back-alley");
                break;
              case "stairs":
                await interaction.reply("From _T Roof_: https://www.csgonades.com/nades/mirage-smoke-stairs-from-t-roof");
                break;
              case "tetris":
                await interaction.reply("No smokes available for Tetris.");
                break;
              case "ticketbooth":
                await interaction.reply("From _Ramp_: https://www.csgonades.com/nades/smoke-ticket-from-ramp");
                break;
              case "topmid":
                await interaction.reply("From _T Spawn_: https://www.csgonades.com/nades/mirage-top-mid-smoke-2");
                break;
              case "window":
                await interaction.reply("From _T Spawn_: https://www.csgonades.com/nades/mirage-window-smoke");
                break;
              case "van":
                await interaction.reply("No smokes available for Van.");
                break;
              default:
                await interaction.reply("Error: not a supported calloutPosition");
                break;
            }
            break;
          case "nuke":
            // TODO
            await interaction.reply("Nuke is not supported yet");
            break;
          case "overpass":
            // TODO
            await interaction.reply("Overpass is not supported yet");
            break;
          case "dust2":
            // TODO
            await interaction.reply("Dust II is not supported yet");
            break;
          case "vertigo":
            // TODO
            await interaction.reply("Vertigo is not supported yet");
            break;
          case "ancient":
            // TODO
            await interaction.reply("Ancient is not supported yet");
            break;
          case "cache":
            // TODO
            await interaction.reply("Cache is not supported yet");
            break;
          case "train":
            // TODO
            await interaction.reply("Train is not supported yet");
            break;
          default:
            await interaction.reply("Error: not a supported map");
            break;
        }
      } else if(team === "ct"){
        // TODO
        await interaction.reply("CT team is not supported yet");
      } else {
        await interaction.reply("Error: not a supported team")
      }
    } else if(nadeType === "molly") {
      // TODO
      await interaction.reply("Molotov lineups are not supported yet.");
    } else if(nadeType === "flash") {
      // TODO
      await interaction.reply("Flash lineups are not supported yet.");
    } else if(nadeType === "frag") {
      // TODO
      await interaction.reply("Grenade lineups are not supported yet.");
    } else {
      await interaction.reply("Error: not a supported nadeType");
    }
  },
};
