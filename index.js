// import packages
require("dotenv").config();
const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const { genEmbed } = require("./utility");

// database
require("./db");
const Server = require("./models/Server");
const Member = require("./models/Member");

// initialize API
const client = new Discord.Client();
client.login(process.env.DISCORD_API_KEY);

const PREFIX = process.env.PREFIX;
const EMBED_COLOR = "#00CB09";

client.on("ready", () => {
    console.log("The bot is running");
});

// commands
const commands = [require("./commands/bal"), require("./commands/gen")];
// const commands = {
//     help: function (msg, author, words) {
//         let str = "Commands you can request:\n";
//         for (command in this) {
//             str += PREFIX + command + "\n";
//         }
//         msg.channel.send(str);
//     },
// };

function help(msg) {
    let results = commands.map((v) => {
        return {
            name: v.name,
            value: `${v.description}\nuse: ${PREFIX + v.usage}`,
        };
    });
    genEmbed(msg.channel, "Ecobot Help Center", (embed) => {
        embed.addFields(results);
    });
}

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(PREFIX)) return;
    const words = message.content.split(" ");
    const command = words.shift().substring(PREFIX.length).toLowerCase();
    if (command == "help") {
        help(message);
        return;
    }
    if (!commands.some((v) => v.name == command)) {
        genEmbed(message.channel, "Invalid Command", (embed) => {
            embed.setDescription("Use **" + PREFIX + "help** for commands.");
        });
        return;
    }
    const serverId = message.guild.id;
    let server = await Server.findOne({ id: serverId });
    if (!server) {
        server = await initializeServer(serverId, message);
    }
    const requestedCommand = commands.find((v) => v.name == command);
    if (
        requestedCommand.bankOnly &&
        !message.member.roles.cache.find((r) => r.name === "bank")
    ) {
        genEmbed(message.channel, "Bank Only", (embed) => {
            embed.setDescription(
                "Only members with the **bank** role may use this command."
            );
        });
        return;
    }
    try {
        await requestedCommand.func(message, message.author, server, words);
    } catch (err) {
        genEmbed(message.channel, "Error", (embed) => {
            embed.setDescription(
                "Ecobot has errored. Please check your command usage. Use **" +
                    PREFIX +
                    "help** for commands."
            );
        });
        console.log(err);
    }
});

function getServer(message) {}

async function initializeServer(serverId, message) {
    genEmbed(message.channel, "Please wait", (embed) => {
        embed.setDescription(
            `Initializing Ecobot for ${message.guild.name}...`
        );
    });
    let allMembers = await client.guilds.cache.get(serverId).members.fetch();
    allMembers = allMembers.map(
        (v) =>
            new Member({
                name: v.user.username,
                balance: 0,
                serverId: serverId,
                id: v.id,
            })
    );
    const newServer = new Server({
        members: allMembers,
        id: serverId,
        startingBalance: 0,
    });
    await newServer.save();
    return newServer;
}
