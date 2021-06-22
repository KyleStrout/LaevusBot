const profileModel = require('../../models/profileSchema')
const CommandTypes = require('../../helpers/CommandTypes')
const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')

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
            .setDescription(`Withdrawal cant be a negative number`)
            .setColor(EmbedColors.Discord.RED)
        await interaction.reply({ embeds: [failure], ephemeral: true })
        return
    }
    try {
        if (amount > profileData.bank) {
            let failure = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":x: Failure!")
                .setDescription(`You dont have that amount of coins to withdraw`)
                .setColor(EmbedColors.Discord.RED)
            await interaction.reply({ embeds: [failure], ephemeral: true })
            return

        }
        const response = await profileModel.findOneAndUpdate({
            userID: interaction.user.id,
        }, {
            $inc: {
                coins: amount,
                bank: -amount,
            }
        })
        let withdraw = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":bank: Succesful")
            .setDescription(`**Withdrawn**: ${amount}`)
            .setColor(EmbedColors.Discord.GREEN)
            .addField('__**New Balance**__', `**Wallet**: ${profileData.coins + amount}\n**Bank**: ${profileData.bank - amount}`)
        await interaction.reply({ embeds: [withdraw] })
    } catch (err) {
        console.log(err)
    }

}

module.exports = {
    name: 'withdraw',
    description: 'Withdraw coins from your bank into your wallet',
    definition: {
        name: 'withdraw',
        description: 'Withdraw coins from your bank into your wallet',
        options: [
            {
                name: 'amount',
                description: 'The amount of money you want to withdraw',
                type: CommandTypes.INTEGER,
                required: true
            }]
    },
    execute
};