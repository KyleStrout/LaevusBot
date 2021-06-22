const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')
const fetch = require('node-fetch')

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {

    fetch("https://zenquotes.io/api/random", {
        "method": "GET",
    })
        .then(response => {
            response.json().then(async (json) => {
                let quote = json[0]
                let quoteEmbed = new MessageEmbed()
                    .setTitle(`:coffee: - ${quote.a}`)
                    .setDescription(quote.q)
                interaction.reply({ embeds: [quoteEmbed] })
            })

        })
        .catch(err => {
            console.error(err)
        })

}

module.exports = {
    name: 'quote',
    description: 'Get a random quote',
    definition: {
        name: 'quote',
        description: 'Get a random quote'
    },
    execute
};