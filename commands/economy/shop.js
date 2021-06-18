const profileModel = require('../../models/profileSchema')
const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')

const roles = ['Knight (2000)', 'Samurai (2500)', 'Baron (3000)', 'Shogun (4000)', 'Consul (5000)', 'Chieftain (6000)', 'Emperor (7000)', 'Council Member (8000)', 'Tsar (9000)', 'Immortal Guard (10000)', 'Grandmaster (50000)', 'Legend (75000)', 'GODLIKE (100000)']
async function execute(client, message, args, Discord, profileData) {
    let withdraw = new MessageEmbed()
        // title, desc, color, 
        .setTitle(":shopping_cart: Shop")
        .setDescription(`Role (Price)\n===========\n` + roles.join('\n'))
        .setColor(EmbedColors.Discord.GREEN)
    await message.channel.send({ embed: withdraw, })
}



module.exports = {
    name: 'shop',
    description: "View the shop's items",
    aliases: ['store'],
    execute: execute,
}