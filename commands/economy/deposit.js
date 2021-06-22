const profileModel = require('../../models/profileSchema')
const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')
const CommandTypes = require('../../helpers/CommandTypes')

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {
    let profileData = await profileModel.findOne({ userID: interaction.user.id })

    const amount = interaction.options.first().value
    if (amount % 1 != 0 || amount <= 0) {
        let failure = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Failure!")
            .setDescription(`Deposit cant be a negative number`)
            .setColor(EmbedColors.Discord.RED)
        await interaction.reply({ embeds: [failure], ephemeral: true })
        return
    }
    try {
        if (amount > profileData.coins) {
            let failure = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":x: Failure!")
                .setDescription(`You dont have that amount of coins to deposit`)
                .setColor(EmbedColors.Discord.RED)
            await interaction.reply({ embeds: [failure], ephemeral: true })
            return

        }

        const response = await profileModel.findOneAndUpdate({
            userID: interaction.user.id,
        }, {
            $inc: {
                coins: -amount,
                bank: amount,
            }
        })
        let deposit = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":bank: Succesful")
            .setDescription(`**Deposited**: ${amount}`)
            .setColor(EmbedColors.Discord.GREEN)
            .addField('__**New Balance**__', `**Wallet**: ${profileData.coins - amount}\n**Bank**: ${profileData.bank + amount}`)
        await interaction.reply({ embeds: [deposit] })
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    name: 'deposit',
    description: 'Deposit coins from your wallet into your bank',
    definition: {
        name: 'deposit',
        description: 'Deposit coins from your wallet into your bank',
        options: [
            {
                name: 'amount',
                description: 'The amount of money you want to deposit',
                type: CommandTypes.INTEGER,
                required: true
            }
        ]
    },
    execute
};