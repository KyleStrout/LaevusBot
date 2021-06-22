const { prefix } = require('../../config.json');
const fetch = require('node-fetch')
const fs = require('fs')

const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js')
/**
 * Handle the command
 * @param {Client} client
 * @param {Message} message
 * @param {Array} args 
 * @param {any} Discord
 */
const execute = async (client, message, args, Discord) => {
    if (message.author.id !== '251798099045908480') return


    const command = await client.guilds.cache.get('383003302427754506')?.commands.set([])
        .then(cmd => {
            console.log('UNRegistered commands')
        })
        .catch(err => {
            console.error(err)
        })

}

//https://discord.com/developers/docs/interactions/slash-commands#registering-a-command
module.exports = {
    name: 'undeploy',
    description: 'undeploys all slash commands lul',
    aliases: [],
    usage: '[command name]',
    execute: execute
};