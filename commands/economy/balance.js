const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')
const profileModel = require('../../models/profileSchema')

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {
    let profileData = await profileModel.findOne({ userID: interaction.user.id })

    let balance = new MessageEmbed()
        // title, desc, color, 
        .setTitle(":moneybag: Balance")
        .setDescription(`**Wallet**: ${profileData.coins}\n**Bank**: ${profileData.bank}`)
        .setColor(EmbedColors.Discord.GREEN)
    // await message.channel.send({ embeds: [generatedQuestionEmbed] })
    await interaction.reply({ embeds: [balance] })

}

module.exports = {
    name: 'balance',
    description: 'View wallet and bank account balances',
    definition: {
        name: 'balance',
        description: 'View wallet and bank account balances'
    },
    execute
};