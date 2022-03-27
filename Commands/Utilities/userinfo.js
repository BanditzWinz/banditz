const {
    ContextMenuInteraction,
    MessageEmbed
} = require("discord.js");

module.exports = {
    name: "userinfo",
    type: "USER",
    permission: "SEND_MESSAGES",
    context: true,
    /**
     * 
     * @param {ContextMenuInteraction} interaction
     */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId);

        const Response = new MessageEmbed()
            .setColor("BLUE")
            .setAuthor({ name: `${target.user.tag}`, iconURL: `${target.user.displayAvatarURL({ dynamic: true, size: 512 })}` })
            .setThumbnail(target.user.avatarURL({
                dynamic: true,
                size: 512
            }))
            .addField("ID", `${target.user.id}`)
            .addField("Roles", `${target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "none"}`)
            .addField("Joined Server", `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, true)
            .addField("Joined Discord", `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, true)

        interaction.reply({
            embeds: [Response],
            ephemeral: false
        })
    }
}