const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const rankUp = new command(
    "rankup",
    "Increase your rank if you have sufficient funds.",
    "rankup",
    async (msg, author, server, words) => {
        const tier1 = server.tierOneCost;
        const member = server.members.find((v) => v.id == author.id);
        const cost = tier1 * 1.1 ** member.tier;
        if (member.balance >= cost) {
            let previousRole = msg.guild.roles.cache.find(
                (role) => role.name === "Ecobot Tier " + member.tier
            );
            if (previousRole) {
                msg.member.roles.remove(previousRole);
            }
            member.tier++;
            member.balance -= cost;
            let role = msg.guild.roles.cache.find(
                (role) => role.name === "Ecobot Tier " + member.tier
            );
            if (!role) {
                role = await msg.guild.roles.create({
                    data: {
                        name: "Ecobot Tier " + member.tier,
                        color: "GREEN",
                    },
                });
            }
            msg.member.roles.add(role);

            server.markModified("members");
            await server.save();
            genEmbed(msg.channel, "Rankup Successful", (embed) => {
                embed.setDescription(
                    `:arrow_up: You have successfully ranked-up to Tier ${member.tier}, costing you $${(cost).toFixed(2)}.`
                );
            });
        } else {
            genEmbed(msg.channel, "Money Allocation Error", (embed) => {
                embed.setDescription(`You do not have sufficient funds.`);
            });
            return;
        }
    },
    false
);

module.exports = rankUp;
