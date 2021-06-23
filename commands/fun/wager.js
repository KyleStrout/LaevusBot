const EmbedColors = require('../../helpers/EmbedColors')
const profileModel = require('../../models/profileSchema')
const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const CommandTypes = require('../../helpers/CommandTypes');

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {
    const amount = interaction.options.first().value
    let max = 100
    let min = 0
    let botRandomNumber = Math.floor(Math.random() * (max - min)) + min
    let userRandomNumber = Math.floor(Math.random() * (max - min)) + min
    let profileData = await profileModel.findOne({ userID: interaction.user.id })

    if (amount % 1 != 0 || amount <= 0) {
        let response = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Invalid wager")
            .setDescription(`Please enter a whole number`)
            .setColor(EmbedColors.Default.DARK_RED)
        await interaction.reply({ embeds: [response] })
        return
    }

    try {
        if (profileData.coins < amount) {
            let response = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":x: Error")
                .setDescription(`You dont have that amount of coins in your wallet to wager.`)
                .setColor(EmbedColors.Default.DARK_RED)
            await interaction.reply({ embeds: [response] })
            return
        }
        if (userRandomNumber > botRandomNumber) {
            const response = await profileModel.findOneAndUpdate({
                userID: interaction.user.id,
            }, {
                $inc: {
                    coins: amount,
                }
            })
            let roll = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":game_die: You win!")
                .setDescription(`**${interaction.user.username}:** ${userRandomNumber}\n**LaevusBot:** ${botRandomNumber}\n**Earnings:** ${amount}`)
                .setColor(EmbedColors.Default.GREEN)
            await interaction.reply({ embeds: [roll] })
        }
        else {
            const response = await profileModel.findOneAndUpdate({
                userID: interaction.user.id,
            }, {
                $inc: {
                    coins: -amount,
                }
            })
            let roll = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":game_die: You lose!")
                .setDescription(`**${interaction.user.username}:** ${userRandomNumber}\n**LaevusBot:** ${botRandomNumber}\n**Losses:** ${amount}`)
                .setColor(EmbedColors.Default.DARK_RED)
            await interaction.reply({ embeds: [roll] })
        }
    } catch (err) {
        console.log(err)
    }


}

module.exports = {
    name: 'wager',
    description: 'Roll against the bot to win coins',
    definition: {
        name: 'wager',
        description: 'Roll against the bot to win coins',
        options: [
            {
                name: 'amount',
                description: 'Number of coins to wager',
                type: CommandTypes.INTEGER,
                required: true
            }
        ]
    },
    execute
};



