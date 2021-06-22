const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {

    await interaction.reply({
        embeds: [
            {
                title: 'Not imeplmented',
                description: 'Not implemented'
            }
        ]
    })

}

module.exports = {
    name: 'role',
    description: 'dogs',
    definition: {
        name: 'role',
        description: 'dogs'
    },
    execute
};