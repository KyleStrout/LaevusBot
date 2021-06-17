const profileModel = require('../../models/profileSchema')



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

        await message.reply(`You withdrew ${amount} coins out of your bank`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    name: 'withdrawal',
    description: 'Withdraw coins from your bank',
    aliases: ['withdrawal', 'wd'],
    execute: execute,
}