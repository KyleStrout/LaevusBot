const profileModel = require('../../models/profileSchema')
const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')

async function execute(client, message, args, Discord, profileData) {
    let count = new MessageEmbed()
        // title, desc, color, 
        .setTitle(":desktop: Messages Sent")
        .setDescription(`Amount: ${profileData.messageCount}`)
        .setColor(EmbedColors.Default.DARK_BLUE)
    await message.channel.send({ embed: count, })
}

module.exports = {
    name: 'message_count',
    description: 'Number of messages you have sent in the discord server',
    aliases: ['count', 'messages'],
    execute: execute,
}

// YO