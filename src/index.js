require('./console/watermark')
const { Client, Partials, Collection } = require('discord.js');
Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android";
const colors = require('colors');
const config = require('./config/config.json')


const client = new Client({
    intents: [
        "Guilds",
        "GuildMessages",
        "GuildPresences",
        "GuildMessageReactions",
        "DirectMessages",
        "MessageContent",
        "GuildVoiceStates"
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction
    ]
})


client.commands = new Collection()
client.events = new Collection()
client.slash = new Collection()
client.aliases = new Collection()
client.config = require("./config/config.json")

module.exports = client;

["event", "slash"].forEach(file => {
    require(`./handlers/${file}`)(client);
});

const moment = require('moment-timezone');

client.on('ready', () => {
  console.log ('Bot is ready')
  setInterval(() => {
    const currentTime = moment().tz('Asia/Bangkok');
    const hours = currentTime.format('HH');
    const minutes = currentTime.format('mm');

    let emoji = '';

    if (minutes >= 0 && minutes < 30) {
      emoji = '🕐';
    } else {
      emoji = '🕜';
    }

    const thailandTime = currentTime.format(`[${emoji}] h:mm A`);

    client.user.setActivity('customstatus', {
      type: 'CUSTOM_STATUS',
      state: `${thailandTime} (UTC+7)`
    });
  }, 1000); // Update every second
});

client.login(process.env.TOKEN)
    .catch((err) => {
        console.log("[CRUSH] Something went wrong while connecting to your bot" + "\n");
        console.log("[CRUSH] Error from DiscordAPI :" + err);
        process.exit();
    })

process.on("unhandledRejection", async (err) => {
    console.log(`[ANTI - CRUSH] Unhandled Rejection : ${err.stack}`)
})

/**
 * ======================================================
 * Developed by FlameQuard | https://flamequard.tech
 * ======================================================
 * Mention FlameQuard when you use this codes
 * ======================================================
 * Give an awesome start to this repositories
 * ======================================================
 */