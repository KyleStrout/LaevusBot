const profileModel = require('../../models/profileSchema')
const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')



async function execute(client, message, args, Discord, profileData) {
    const amount = args[0]
    console.log(amount)
    if (amount % 1 != 0 || amount <= 0) {
        return await message.reply('Withdrawal amount must be a whole number')
    }
    try {
        if (amount > profileData.bank) {
            return await message.reply("You dont have that amount of coins to withdraw")
        }
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                coins: amount,
                bank: -amount,
            }
        })
        let withdraw = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":money_with_wings: Withdrawal")
            .setDescription(`Amount: ${amount}`)
            .setColor(EmbedColors.Discord.GREEN)
        await message.channel.send({ embed: withdraw, })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    name: 'withdrawal',
    description: 'Withdraw coins from your bank',
    aliases: ['withdraw', 'wd'],
    execute: execute,
}