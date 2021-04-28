// import packages
require("dotenv").config();
const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");

// database
require("./db");
const Server = require("./models/Server");
const User = require("./models/User");

// initialize API
const client = new Discord.Client();
client.login(process.env.DISCORD_API_KEY);

const PREFIX = process.env.PREFIX;
const EMBED_COLOR = "#00CB09";

client.on("ready", () => {
    console.log("The bot is running");
});

// commands
const commands = {
    help: function (msg, author, words) {
        let str = "Commands you can request:\n";
        for (command in this) {
            str += PREFIX + command + "\n";
        }
        msg.channel.send(str);
    },
};

client.on("message", (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
    const words = message.content.split(" ");
    const command = words[0].substring(PREFIX.length).toLowerCase();
    if (commands[command] == undefined) {
        genEmbed(message.channel, "Invalid Command", (embed) => {
            embed.setDescription("Use **" + PREFIX + "help** for commands.");
        });
        return;
    }
    commands[command](message, message.author, words.slice(1));
});

function genEmbed(channel, title, next) {
    const embed = new Discord.MessageEmbed()
        .setColor(EMBED_COLOR)
        .setTitle(title);
    next(embed);
    channel.send({ embed: embed });
}
