const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')
const profileModel = require('../../models/profileSchema')
const CommandTypes = require('../../helpers/CommandTypes')


/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {
    let profileData = await profileModel.findOne({ userID: interaction.user.id })
    const winnings = 100000
    const userNumber = interaction.options.first().value
    const lotteryNumber = Math.floor(Math.random() * 10000) + 0

    if (userNumber % 1 != 0 || userNumber <= 0) {
        let failure = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Failure!")
            .setDescription(`Your guess must be between 1-10000 `)
            .setColor(EmbedColors.Discord.RED)
        await interaction.reply({ embeds: [failure], ephemeral: true })
        return
    }

    try {
        if (userNumber == lotteryNumber) {
            const response = await profileModel.findOneAndUpdate({
                userID: interaction.user.id,
            }, {
                $inc: {
                    coins: winnings,
                }
            })
            let winningMessage = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":tada: You have won the lottery!")
                .setDescription(`**Winnings:** ${winnings}`)
                .setColor(EmbedColors.Default.GREEN)
            await interaction.react({ embeds: [winningMessage] })
        }
        else {
            let response = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":x: You lose!")
                .setDescription(`Better luck next time, ${interaction.user}`)
                .setColor(EmbedColors.Default.DARK_RED)
            await interaction.reply({ embeds: [response], ephemeral: true })
        }
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    name: 'lottery',
    description: 'Test your odds, against 1 in 10,000 for a BIG prize',
    definition: {
        name: 'lottery',
        description: 'Test your odds, against 1 in 10,000 for a BIG prize',
        options: [
            {
                name: 'number',
                description: 'Your guess between 1-10000',
                type: CommandTypes.INTEGER,
                required: true
            }
        ]
    },
    execute
};