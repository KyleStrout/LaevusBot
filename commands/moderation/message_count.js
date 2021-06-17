const profileModel = require('../../models/profileSchema')

async function execute(client, message, args, Discord, profileData) {
    await message.reply("You have sent " + profileData.messageCount + " messages")
}

module.exports = {
    name: 'message_count',
    description: 'Number of messages you have sent in the discord server',
    aliases: ['count', 'messages'],
    execute: execute,
}