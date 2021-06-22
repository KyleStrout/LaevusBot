const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')
const CommandTypes = require('../../helpers/CommandTypes')
const profileModel = require('../../models/profileSchema')

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {
    let profileData = await profileModel.findOne({ userID: interaction.user.id })

    const amount = interaction.options.get('amount').value
    const target = interaction.options.get('user').user
    if (amount % 1 != 0 || amount <= 0) {
        let failure = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Failure!")
            .setDescription(`You cant send a negative amount of coins`)
            .setColor(EmbedColors.Discord.RED)
        await interaction.reply({ embeds: [failure], ephemeral: true })
        return
    }
    if (amount > profileData.bank) {
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(':x: Failure')
                    .setDescription(`You don't have that amount in your bank to send`)
                    .setColor(EmbedColors.Discord.RED)
            ], ephemeral: true
        })
        return
    }

    if (interaction.user.id === target.id) {
        let failure = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Failure!")
            .setDescription(`Can't give yourself money silly!`)
            .setColor(EmbedColors.Discord.RED)
        await interaction.reply({ embeds: [failure], ephemeral: true })
        return
    }

    try {
        await profileModel.findOneAndUpdate({
            userID: target.id,
        }, {
            $inc: {
                bank: amount,
            }
        })
        await profileModel.findOneAndUpdate({
            userID: interaction.user.id,
        }, {
            $inc: {
                bank: -amount
            }
        })

        let response = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":white_check_mark: Transfer Complete")
            .setDescription(`You sent ${target} ${amount}`)
            .setColor(EmbedColors.Discord.GREEN)
        await interaction.reply({ embeds: [response] })
        return

    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    name: 'give',
    description: 'Give someone some money',
    definition: {
        name: 'give',
        description: 'Give someone some money',
        options: [
            {
                name: 'user',
                description: 'The User you want to give money to',
                type: CommandTypes.USER,
                required: true
            },
            {
                name: 'amount',
                description: 'The amount you want to give',
                type: CommandTypes.INTEGER,
                required: true
            }
        ]
    },
    execute
};