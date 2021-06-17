const triviaModel = require('../../models/triviaSchema')
const profileModel = require('../../models/profileSchema')

async function execute(client, message, args, Discord) {
    userAnswer = args[0]

    userResponse = await triviaModel.findOne({ answer: userAnswer })
    if (userResponse) {
        if (userResponse.state == "ready") {
            await message.reply("Congrats you got it right")
            // update to answered
            await triviaModel.findOneAndUpdate({
                id: 1
            }, {
                state: "used"
            })
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    bank: 250
                }
            })
        }
        else {
            await message.reply("Someone already answered that, type !trivia for a new question")
        }

    }
    else {
        await message.reply("Sorry that's not correct")
    }

}

module.exports = {
    name: 'answer',
    description: 'Answer random trivia',
    aliases: [],
    args: true,
    execute: execute,
};