const profileModel = require('../../models/profileSchema')

const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {

    const roles = [
        { name: 'Knight', price: 2000 },
        { name: 'Samurai', price: 2500 },
        { name: 'Baron', price: 3000 },
        { name: 'Shogun', price: 4000 },
        { name: 'Consul', price: 5000 },
        { name: 'Chieftain', price: 6000 },
        { name: 'Emperor', price: 7000 },
        { name: 'Council Member', price: 8000 },
        { name: 'Tsar', price: 9000 },
        { name: 'Immortal Guard', price: 10000 },
        { name: 'Grandmaster', price: 50000 },
        { name: 'Legend', price: 75000 },
        { name: 'GODLIKE', price: 100000 },
    ]

    // Get discord rolesk
    let actualRoles = []
    roles.forEach(role => {
        let r = interaction.guild.roles.cache.filter(guildRole => guildRole.name.toLowerCase().includes(role.name.toLowerCase()))
        actualRoles.push(r.first())
    })

    // Build string to put in embed description
    let stringOfRoles = ''
    roles.map(role => {
        let price = role.price
        let actualRole = actualRoles.filter(ar => ar.name.toLowerCase().includes(role.name.toLowerCase()))[0]
        stringOfRoles += `$ ${price} - ${actualRole} \n`
    })

    let shop = new MessageEmbed()
        // title, desc, color,  
        .setTitle(":shopping_cart: Shop")
        .setDescription(stringOfRoles)
        .setColor(EmbedColors.Discord.GREEN)
    await interaction.reply({ embeds: [shop] })

}

module.exports = {
    name: 'shop',
    description: 'View the shop to see what you can purchase',
    definition: {
        name: 'shop',
        description: 'View the shop to see what you can purchase'
    },
    execute
};