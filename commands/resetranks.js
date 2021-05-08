const { genEmbed } = require("../utility");
const { command, Server } = require("./command");

const resetRanks = new command(
    "resetranks",
    "Resets all Ecobot Tier ranks on the server.",
    "resetranks",
    async (msg, author, server, words) => {
        const allMembers = await msg.guild.members.fetch();
        const allMemberIds = allMembers.keyArray()
        server.members.forEach(m => {
            let member = allMembers.get(m.id);
            let role = member.roles.cache.find(
                (role) => role.name === "Ecobot Tier " + m.tier
            );
            if (role != undefined) {
              msg.member.roles.remove(role);
            }
            m.tier = 0;
        })
        server.markModified("members");
        await server.save();
        genEmbed(msg.channel, "Reset Successful", (embed) => {
            embed.setDescription(`All Tier ranks have been reset.`);
        });
    },
    true
);

module.exports = resetRanks;
