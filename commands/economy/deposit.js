const profileModel = require('../../models/profileSchema')
const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')



async function execute(client, message, args, Discord, profileData) {
    const amount = args[0]
    console.log(amount)
    if (amount % 1 != 0 || amount <= 0) {
        return await message.reply('Deposit amount must be a whole number')
    }
    try {
        if (amount > profileData.coins) {
            return await message.reply("You dont have that amount of coins to deposit")
        }
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                coins: -amount,
                bank: amount,
            }
        })
        let deposit = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":bank: Deposited")
            .setDescription(`Amount: ${amount}`)
            .setColor(EmbedColors.Discord.GREEN)
        await message.channel.send({ embed: deposit, })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    name: 'deposit',
    description: 'Deposit coins into your bank',
    aliases: ['depot', 'depo'],
    execute: execute,
}