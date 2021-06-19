const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')

/** 
 * Handle the roll command
 * @param {Message} message The user message 
 * @param {Array} args The command arguments
 */
async function execute(client, message, args, Discord) {
    let max = args.length > 0 ? args[0] : 100
    let min = 0
    let botRandomNumber = Math.floor(Math.random() * (max - min)) + min
    let userRandomNumber = Math.floor(Math.random() * (max - min)) + min


    if (botRandomNumber < userRandomNumber) {
        let roll = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":game_die: You win!")
            .setDescription(`${message.author.username}: ${userRandomNumber}\nLaevusBot: ${botRandomNumber}`)
            .setColor(EmbedColors.Default.GREEN)
        await message.channel.send({ embed: roll, })
        await message.react("<LaevusPog:806694928092495913>")
    }
    else {
        let roll = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":game_die: You lose!")
            .setDescription(`${message.author.username}: ${userRandomNumber}\nBot: ${botRandomNumber}`)
            .setColor(EmbedColors.Default.DARK_RED)
        await message.channel.send({ embed: roll, })
    }





}

module.exports = {
    name: 'roll',
    description: 'Ping!',
    aliases: ['turkey'],
    execute: execute,
};