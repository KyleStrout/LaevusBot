

/**
 * @param {Message} message The user message
 * @param {Array} args The command arguments
 */

const { description } = require("../fun/ping")


async function execute(client, message, args, Discord, profileData) {
    await message.channel.send(`Wallet balance: ${profileData.coins}\nBank: ${profileData.bank}`)
}

module.exports = {
    name: 'balance',
    description: 'User wallet balance and bank balance',
    aliases: ['bal'],
    execute: execute,
}