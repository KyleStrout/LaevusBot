const { GuildMember } = require('discord.js')
const profileModel = require('../../models/profileSchema')

/** 
 * Handle the roll command
 * @param {Member} member The guild member
 * @param {Array} args The command arguments
 */

module.exports = async (client, Discord, member) => {
    let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Soldier')

    await member.roles.add(welcomeRole)
    await member.guild.channels.cache.get('839092761584074832').send(`Welcome to the discord ${member.user.username}! Type !help for commands`)



    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        coins: 1000,
        bank: 0,
        messageCount: 0,
    })
    profile.save()
}