const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')
const profileModel = require('../../models/profileSchema')

/** 
 * Handle the roll command
 * @param {Message} message The user message 
 * @param {Array} args The command arguments
 */
async function execute(client, message, args, Discord, profileData) {
    const amount = args[0]
    let max = 100
    let min = 0
    let botRandomNumber = Math.floor(Math.random() * (max - min)) + min
    let userRandomNumber = Math.floor(Math.random() * (max - min)) + min


    try {
        if (profileData.coins < amount) {
            return await message.reply("You dont have that amount of coins in your wallet to wager.")
        }
        if (userRandomNumber > botRandomNumber) {
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                $inc: {
                    coins: amount,
                }
            })
            let roll = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":game_die: You win!")
                .setDescription(`${message.author.username}: ${userRandomNumber}\nLaevusBot: ${botRandomNumber}\nEarnings: ${amount}`)
                .setColor(EmbedColors.Default.GREEN)
            await message.channel.send({ embed: roll, })
            await message.react("<LaevusPog:806694928092495913>")
        }
        else {
            const response = await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                $inc: {
                    coins: -amount,
                }
            })
            let roll = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":game_die: You lose!")
                .setDescription(`${message.author.username}: ${userRandomNumber}\nLaevusBot: ${botRandomNumber}\nLosses: ${amount}`)
                .setColor(EmbedColors.Default.DARK_RED)
            await message.channel.send({ embed: roll, })
        }
    } catch (err) {
        console.log(err)
    }





}

module.exports = {
    name: 'wager',
    description: 'Roll a random number against the bot and wager your coins (!roll <wager>)',
    aliases: ['gamble', 'gamba'],
    args: true,
    execute: execute,
};