const profileModel = require('../../models/profileSchema')



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

        await message.reply(`You deposited ${amount} coins into your bank`)
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