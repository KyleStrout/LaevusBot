const { Message } = require('discord.js')

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
    let didUserWin = false
    let replyMessage = ''

    replyMessage = '\nYou rolled a ' + userRandomNumber + '!\n'
    replyMessage += 'The bot rolled a ' + botRandomNumber + '!\n'
    await message.reply(replyMessage)

    if (botRandomNumber > userRandomNumber) {
        await message.react("<LaevusPog:806694928092495913>")
        await message.channel.send('Congratulations!')
    }
    else {
        await message.channel.send("You lose!")
    }



}

module.exports = {
    name: 'roll',
    description: 'Ping!',
    aliases: ['turkey'],
    execute: execute,
};