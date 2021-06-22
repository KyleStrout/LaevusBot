const { prefix } = require('../../config.json');
const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')
const fs = require('fs')

/**
 * Handle the command
 * @param {CommandInteraction} interaction
 */
async function execute(interaction) {
    let helpEmbed = new MessageEmbed()
        .setTitle(":book: Help")
        .setDescription(
            "> Here's a list of all my commands and what they do." +
            "\n > **Note**: you can also do `/` to autocomplete discord commands."
        )
        .setColor(EmbedColors.Discord.YELLOW)

    const commandFolders = fs.readdirSync('./commands');
    commandFolders.forEach(folder => {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
        commandFiles.forEach(file => {
            const command = require(`../../commands/${folder}/${file}`);
            if (command.definition) {
                helpEmbed.addField(`/${command.definition.name}`, command.definition.description)
            }
        })

    })

    await interaction.reply({ embeds: [helpEmbed], ephemeral: true })

}

module.exports = {
    name: 'help',
    description: 'List all of my commands',
    definition: {
        name: 'help',
        description: 'List all of my commands',
        options: [],
    },
    execute
};