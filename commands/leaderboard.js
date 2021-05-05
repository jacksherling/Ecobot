const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const leaderboard = new command(
    "leaderboard",
    "Displays top 10 members with the most money.",
    "leaderboard",
    async (msg, author, server, words) => {
        const topMembers = server.members
            .sort((a, b) => b.balance - a.balance)
            .slice(0, 10);
        genEmbed(msg.channel, `${msg.guild.name} Leaderboards`, (embed) => {
            embed.addFields(
                topMembers.map((v) => {
                    return {
                        name: v.name,
                        value: v.balance,
                    };
                })
            );
        });
    },
    false
);

module.exports = leaderboard;
