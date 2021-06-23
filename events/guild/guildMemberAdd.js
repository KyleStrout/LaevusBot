const { GuildMember } = require('discord.js')
const profileModel = require('../../models/profileSchema')
const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors');
const CommandTypes = require('../../helpers/CommandTypes');

/** 
 * Handle the roll command
 * @param {Member} member The guild member
 * @param {Array} args The command arguments
 */



module.exports = async (client, Discord, member) => {
    //let welcomeRole = member.guild.roles.cache.find(role => role.name === 'Soldier')
    //await member.roles.add(welcomeRole)

    welcomeEmbed = new MessageEmbed()
        .setTitle(':wave: Welcome to Games & Sleep!')
        .setDescription(`**${member.user.username}** just joined!\nUse \`/\` to use the bot`)
        .setColor(EmbedColors.Discord.YELLOW)
    await member.guild.channels.cache.get('839092761584074832').send({ embeds: [welcomeEmbed] })

    //383003302427754509



    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        coins: 1000,
        bank: 0,
        messageCount: 0,
    })
    profile.save()
}