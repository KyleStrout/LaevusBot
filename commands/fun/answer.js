const triviaModel = require('../../models/triviaSchema')
const profileModel = require('../../models/profileSchema')
const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors');
const CommandTypes = require('../../helpers/CommandTypes');

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {
    const userAnswer = interaction.options.first().value

    userResponse = await triviaModel.findOne({ answer: userAnswer })
    if (userResponse) {
        if (userResponse.state == "ready") {
            const randomNumber = Math.floor(Math.random() * 800) + 200
            let response = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":white_check_mark: Correct")
                .setDescription(`Coins Earned: ${randomNumber}`)
                .setColor(EmbedColors.Discord.GREEN)
            await interaction.reply({ embeds: [response] })
            // update to answered
            await triviaModel.findOneAndUpdate({
                id: 1
            }, {
                state: "used"
            })
            await profileModel.findOneAndUpdate({
                userID: interaction.user.id
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
                .setDescription(`Someone already answered that, type \`/trivia\` for a new question`)
                .setColor(EmbedColors.Default.DARK_RED)
            await interaction.reply({ embeds: [response] })
        }

    }
    else {
        let response = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Incorrect")
            .setDescription("Sorry that's not correct")
            .setColor(EmbedColors.Default.DARK_RED)
        await interaction.reply({ embeds: [response] })
    }


}

module.exports = {
    name: 'answer',
    description: 'Answer the most recent trivia question to earn coins',
    definition: {
        name: 'answer',
        description: 'Answer the most recent trivia question to earn coins',
        options: [
            {
                name: 'answer',
                description: 'Your answer (must be a number)',
                type: CommandTypes.INTEGER,
                required: true
            }
        ]
    },
    execute
};