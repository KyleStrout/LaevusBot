const profileModel = require('../../models/profileSchema')
const EmbedColors = require('../../helpers/EmbedColors')
const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');


/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {
    let profileData = await profileModel.findOne({ userID: interaction.user.id })

    let count = new MessageEmbed()
        // title, desc, color, 
        .setTitle(":desktop: Messages Sent")
        .setDescription(`Amount: ${profileData.messageCount}`)
        .setColor(EmbedColors.Default.DARK_BLUE)
    await interaction.reply({ embeds: [count] })

}

module.exports = {
    name: 'messagecount',
    description: 'Displays your message count in the discord',
    definition: {
        name: 'messagecount',
        description: 'Displays your message count in the discord'
    },
    execute
};
