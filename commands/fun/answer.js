const triviaModel = require('../../models/triviaSchema')
const profileModel = require('../../models/profileSchema')
const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')

async function execute(client, message, args, Discord) {
    userAnswer = args[0]

    userResponse = await triviaModel.findOne({ answer: userAnswer })
    if (userResponse) {
        if (userResponse.state == "ready") {
            const randomNumber = Math.floor(Math.random() * 800) + 200
            let response = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":white_check_mark: Correct")
                .setDescription(`Coins Earned: ${randomNumber}`)
                .setColor(EmbedColors.Discord.GREEN)
            await message.channel.send({ embed: response, })
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
                    coins: randomNumber
                }
            })
        }
        else {
            let response = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":x: Incorrect")
                .setDescription(`Someone already answered that, type !trivia for a new question`)
                .setColor(EmbedColors.Default.DARK_RED)
            await message.channel.send({ embed: response, })
        }

    }
    else {
        let response = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Incorrect")
            .setDescription("Sorry that's not correct")
            .setColor(EmbedColors.Default.DARK_RED)
        await message.channel.send({ embed: response, })
    }

}

module.exports = {
    name: 'answer',
    description: 'Answer random trivia',
    aliases: [],
    args: true,
    execute: execute,
};