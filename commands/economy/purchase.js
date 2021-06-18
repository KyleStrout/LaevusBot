const profileModel = require('../../models/profileSchema')
const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')
const checkAccount = require('../../helpers/checkAccount')

/**
 * @param {client,} client The client
 * @param {Message} message The message
 * @param {args} args The args
 * @param {Discord} Discord The Discord
 * @param {profileData} profileData The profileData
 */
async function execute(client, message, args, Discord, profileData) {
    let roleName1 = args[0]
    let roleName2 = ""
    let roleName = ""

    if (args.length > 1) {
        roleName2 = args[1]
        roleName = (roleName1 + ' ' + roleName2).toLowerCase()
    }
    else {
        roleName = roleName1.toLowerCase()
    }

    // function to check if user has amount for each


    // List of valid entries foreach role
    // TODO Replace with slash command, to allow for auto completion of role names
    const listOfValidUserRoles = [
        { price: 2000, name: 'knight' },
        { price: 2500, name: 'samurai' },
        { price: 3000, name: 'baron' },
        { price: 4000, name: 'shogun' },
        { price: 5000, name: 'consul' },
        { price: 6000, name: 'chieftain' },
        { price: 7000, name: 'emperor' },
        { price: 8000, name: 'council member' },
        { price: 9000, name: 'tsar' },
        { price: 10000, name: 'immortal guard' },
        { price: 50000, name: 'grandmaster' },
        { price: 75000, name: 'legend' },
        { price: 100000, name: 'godlike' }
    ]


    // User choice out of roles listed above
    let chosenRole = listOfValidUserRoles.filter(r => r.name === roleName)[0]

    // Check if the user entered something valid
    if (chosenRole) {
        // Search the guild for a role with the choice that the user entered
        let foundRole = message
            .member
            .guild
            .roles
            .cache
            .filter(role => role.name.toLowerCase().startsWith(chosenRole.name))

        // If we found a role in the guild that matched the user input
        // Add it to the user, and notify them
        if (foundRole) {
            // Check user balance for if they can buy the role
            let userCanBuyRole = await checkAccount.isValid(chosenRole.price, profileData, message)
            if (userCanBuyRole) {
                await message.member.roles.add(foundRole)
                let response = new MessageEmbed()
                    // title, desc, color, 
                    .setTitle(":white_check_mark: Purchased")
                    .setDescription(`Role added`)
                    .setColor(EmbedColors.Discord.GREEN)
                await message.channel.send({ embed: response, })
            }
            else {
                let response = new MessageEmbed()
                    // title, desc, color, 
                    .setTitle(":x: Transaction failed")
                    .setDescription(`You don't have enough coins in your wallet`)
                    .setColor(EmbedColors.Default.DARK_RED)
                await message.channel.send({ embed: response, })
            }

        }
        else {
            // Couldn't find the role the user was looking for in the guild
            console.log(`Purchase failure: ${message.author.username} tried to buy ${roleName}`)
            let response = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":x: Transaction failed")
                .setDescription(`Couldn't find that role`)
                .setColor(EmbedColors.Default.DARK_RED)
            await message.channel.send({ embed: response, })
        }


    }
    else {
        // Couldn't find a role the user was looking for in list of valid roless
        console.log(`Purchase failure: ${message.author.username} tried to buy ${roleName}`)
        let response = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Transaction failed")
            .setDescription(`Couldn't find that role`)
            .setColor(EmbedColors.Default.DARK_RED)
        await message.channel.send({ embed: response, })
    }

    // if (roleName == 'knight') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Knight (2000)')
    //     await message.member.roles.add(newRole)

    // }
    // else if (roleName == 'samurai') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Samurai (2500)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'baron') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Baron (3000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'shogun') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Shogun (4000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'consul') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Consul (5000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'chieftain') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Chieftain (6000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'emperor') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Emperor (7000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'council member') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Council Member (8000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'tsar') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Tsar (9000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'immortal guard') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Immortal Guard (10000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'grandmaster') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Grandmaster (50000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'legend') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'Legend (75000)')
    //     await message.member.roles.add(newRole)
    // }
    // else if (roleName == 'godlike') {
    //     let newRole = message.member.guild.roles.cache.find(role => role.name === 'GODLIKE (100000)')
    //     await message.member.roles.add(newRole)
    // }



}



module.exports = {
    name: 'purchase',
    description: "Purchase a role from the shop (!purchase <role>)",
    aliases: ['buy'],
    args: true,
    execute: execute,
}