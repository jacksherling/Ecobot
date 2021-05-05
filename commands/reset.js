const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const reset = new command(
    "reset",
    "Reset the money on the server to the server's starting balance.",
    "reset",
    async (msg, author, server, words) => {
        server.members.forEach((m) => {
            m.balance = server.startingBalance;
        });
        server.markModified("members");
        await server.save();
        genEmbed(msg.channel, "Reset Successful", (embed) => {
            embed.setDescription(
                `All server members' balance has been reset to $${server.startingBalance}.`
            );
        });
    },
    true
);

module.exports = reset;
