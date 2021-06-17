const profileModel = require('../../models/profileSchema')

async function execute(client, message, args, Discord, profileData) {
    if (!args.length) {
        return await message.reply('You need to mention a user to give them coins')
    }
    const amount = args[1]
    const target = message.mentions.users.first()
    if (!target) {
        return await message.reply('That user does not exist')
    }

    if (amount % 1 || amount <= 0) {
        return await message.reply('Amount must be a whole number')
    }

    if (amount > profileData.bank) {
        return await message.reply("You don't have that amount in your bank to send")
    }

    try {
        const targetData = await profileModel.findOne({
            userID: target.id
        })
        if (!targetData) {
            return await message.reply('This user does not exist in the db')
        }
        await profileModel.findOneAndUpdate({
            userID: target.id,
        }, {
            $inc: {
                bank: amount,
            }
        })
        await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                bank: -amount
            }
        })

        return await message.reply(`You gave ${target} ${amount}`)
    } catch (err) {
        console.log(err)
    }
    const updateTarget = await profileModel.findOneAndUpdate({
        userID: target.id
    })

}


module.exports = {
    name: 'give',
    description: 'Give coins to other users',
    aliases: ['donate', 'send'],
    execute: execute,
}