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
    // Fetch slash commands from files
    let slashCommands = []
    const commandFolders = fs.readdirSync('./commands');

    commandFolders.forEach(folder => {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        commandFiles.forEach(file => {
            const command = require(`../../commands/${folder}/${file}`);
            if (command.definition) {
                slashCommands.push(command.definition)
            }
        })
    })


    const command = await client.guilds.cache.get('383003302427754506')?.commands.set(slashCommands)
        .then(cmd => {
            console.log('Registered commands')
            let x = slashCommands.map(sc => sc.name)
            console.table(x)
        })
        .catch(err => {
            console.error(err)
        })

}

//https://discord.com/developers/docs/interactions/slash-commands#registering-a-command
module.exports = {
    name: 'deploy',
    description: 'deploys all slash commands lul',
    aliases: [],
    usage: '[command name]',
    execute: execute
};