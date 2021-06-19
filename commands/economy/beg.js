const profileModel = require('../../models/profileSchema')
const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')

/**
 * @param {Message} message The user message
 * @param {Array} args The command arguments
 */

const { description } = require("../fun/ping")


async function execute(client, message, args, Discord, profileData) {
    const randomNumber = Math.floor(Math.random() * 300) + 50
    //use response for embed
    const response = await profileModel.findOneAndUpdate({
        userID: message.author.id
    },
        {
            // increase coin amount by randomNumber
            $inc: {
                coins: randomNumber,
            }
        })

    let newEmbed = new MessageEmbed()
        // title, desc, color, 
        .setTitle(":coin: You begged!")
        .setDescription(`Coins Received: ${randomNumber}\nShame!`)
        .setColor(EmbedColors.Discord.YELLOW)
    await message.channel.send({ embed: newEmbed, })
}

module.exports = {
    name: 'beg',
    description: 'User wallet balance and bank balance',
    aliases: [],
    cooldown: 180,
    execute: execute,
}