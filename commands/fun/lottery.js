const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')
const profileModel = require('../../models/profileSchema')

/** 
 * Handle the roll command
 * @param {Message} message The user message 
 * @param {Array} args The command arguments
 */
async function execute(client, message, args, Discord, profileData) {
    const userRandomNumber = args[0]
    let lotteryNumber = Math.floor(Math.random() * 10000) + 0
    const winnings = 100000

    if (userRandomNumber % 1 != 0 || userRandomNumber <= 0) {
        let invalidNumberMessage = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Invalid number")
            .setDescription(`Please enter your number to guess (!lottery <number>)`)
            .setColor(EmbedColors.Default.DARK_RED)
        return await message.channel.send({ embed: invalidNumberMessage, })
    }

    try {
        if (userRandomNumber == lotteryNumber) {
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                $inc: {
                    coins: winnings,
                }
            })
            let winningMessage = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":tada: You have won the lottery!")
                .setDescription(`Winnings: ${winnings}`)
                .setColor(EmbedColors.Default.GREEN)
            await message.channel.send({ embed: winningMessage, })
            await message.react("<LaevusPog:806694928092495913>")
        }
        else {
            let response = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":x: You lose!")
                .setDescription(`Better luck next time, ${message.author.username}`)
                .setColor(EmbedColors.Default.DARK_RED)
            await message.channel.send({ embed: response, })
        }
    } catch (err) {
        console.log(err)
    }








}

module.exports = {
    name: 'lottery',
    description: 'Test your odds against 1 in 10000 (!lottery <number>)',
    aliases: ['lotto'],
    args: true,
    cooldown: 300,
    execute: execute,
};