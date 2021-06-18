const profileModel = require('../../models/profileSchema')

/**
 * @param {Message} message The user message
 * @param {Array} args The command arguments
 */

const { description } = require("../fun/ping")


async function execute(client, message, args, Discord, profileData) {
    const randomNumber = Math.floor(Math.random() * 100) + 1
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

    await message.reply(`you begged and recieved ${randomNumber} coins, shame!`)
}

module.exports = {
    name: 'beg',
    description: 'User wallet balance and bank balance',
    aliases: [],
    cooldown: 180,
    execute: execute,
}