const profileModel = require('../../models/profileSchema')
const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')
const { description } = require("../fun/ping")

/**
 * Handle the command
 * @param {CommandInteraction} interaction
 */
async function execute(interaction) {
    const randomNumber = Math.floor(Math.random() * 300) + 50
    //use response for embed
    const response = await profileModel.findOneAndUpdate({
        userID: interaction.user.id
    },
        {
            // increase coin amount by randomNumber
            $inc: {
                coins: randomNumber,
            }
        })


    let begEmbed = new MessageEmbed()
        // title, desc, color, 
        .setTitle(":coin: You begged!")
        .setDescription(`Coins Received: ${randomNumber}\nShame!`)
        .setColor(EmbedColors.Discord.YELLOW)
    // await message.channel.send({ embed: newEmbed, })
    await interaction.reply({ embeds: [begEmbed] })

}

module.exports = {
    name: 'beg',
    description: 'Beg for some coin!',
    definition: {
        name: 'beg',
        description: 'Beg for some coin!',
        options: []
    },

    aliases: [],
    cooldown: 180,
    execute: execute,
}