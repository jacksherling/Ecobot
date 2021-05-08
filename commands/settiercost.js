const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const setTierCost = new command(
    "settiercost",
    "Sets the cost of Tier 1 on the server.",
    "settiercost [$]",
    async (msg, author, server, words) => {
        const newTierOneCost = +words[0];

        if (isNaN(newTierOneCost)) {
            genEmbed(msg.channel, "Input Error", (embed) => {
                embed.setDescription(`Input must be a number.`);
            });
            return;
        }

        server.tierOneCost = newTierOneCost;
        await server.save();

        genEmbed(msg.channel, "Tier Cost Updated", (embed) => {
            embed.setDescription(
                `The new Tier 1 cost is $${newTierOneCost} (Tier 2 now costs $${(newTierOneCost * 1.1).toFixed(2)}).`
            );
        });
    },
    true
);

module.exports = setTierCost;
