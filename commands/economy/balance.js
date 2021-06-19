const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')

/**
 * @param {Message} message The user message
 * @param {Array} args The command arguments
 */

const { description } = require("../fun/ping")


async function execute(client, message, args, Discord, profileData) {
    let balance = new MessageEmbed()
        // title, desc, color, 
        .setTitle(":moneybag: Balance")
        .setDescription(`Wallet: ${profileData.coins}\nBank: ${profileData.bank}`)
        .setColor(EmbedColors.Discord.GREEN)
    // await message.channel.send({ embeds: [generatedQuestionEmbed] })
    await message.channel.send({ embed: balance, })
    //await message.channel.send(`Wallet balance: ${profileData.coins}\nBank: ${profileData.bank}`)
}

module.exports = {
    name: 'balance',
    description: 'User wallet balance and bank balance',
    aliases: ['bal', 'bank', 'wallet'],
    execute: execute,
}