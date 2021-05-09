const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const leaderboard = new command(
    "leaderboard",
    "Displays top 5 members with the most money and highest tiers.",
    "leaderboard",
    async (msg, author, server, words) => {
        const topMembersByBalance = server.members
            .sort((a, b) => b.balance - a.balance)
            .slice(0, 5);
        const topMembersByTier = server.members
            .sort((a, b) => b.tier - a.tier)
            .slice(0, 5);
        genEmbed(msg.channel, `${msg.guild.name} Leaderboards`, (embed) => {
            embed.addFields({
                name: "--- BALANCE ---",
                value: "The top users by balance.",
            });
            embed.addFields(
                topMembersByBalance.map((v) => {
                    return {
                        name: v.name,
                        value: "$" + v.balance,
                    };
                })
            );
            embed.addFields({
                name: "--- TIER ---",
                value: "The top users by tier.",
            });
            embed.addFields(
                topMembersByTier.map((v) => {
                    return {
                        name: v.name,
                        value: "Tier " + v.tier,
                    };
                })
            );
        });
    },
    false
);

module.exports = leaderboard;
