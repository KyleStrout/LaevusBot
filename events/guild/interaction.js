const { CommandInteraction } = require('discord.js')
const profileModel = require('../../models/profileSchema')
const fs = require('fs')
let slashCommands = []

/**
 * Create a user in the DB on interaction if they don't exist
 * @param {CommandInteraction} interaction
 */
const CreateUserDBIfNotExist = async (interaction) => {
    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: interaction.user.id })
        if (!profileData) {
            let profile = await profileModel.create({
                userID: interaction.user.id,
                serverID: interaction.guildID,
                coins: 1000,
                bank: 0,
                messageCount: 0,
            })
        }
    } catch (err) {
        console.log(err)
    }
}

const GetSlashCommands = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const commandFolders = fs.readdirSync('./commands');
            commandFolders.forEach(folder => {
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
                commandFiles.forEach(file => {
                    const command = require(`../../commands/${folder}/${file}`);
                    if (command.definition) {
                        slashCommands.push(command)
                    }
                })
            })
        } catch (error) {
            reject(error)
        }
        resolve()
    })
}

/**
 * Check if a command has a active cooldown for a user
 * @param {Client} interaction
 */
const checkCommandForCooldown = (client, interaction, Discord) => {
    const { cooldowns } = client;
    let filteredCommands = client.commands.filter(command => command.name === interaction.commandName)
    if (filteredCommands) {
        let command = filteredCommands.first()
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return `please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
            }
        }

        timestamps.set(interaction.user.id, now);
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
        return null
    }


}

/**
 * 
 * @param {any} client
 * @param {any} Discord
 * @param {CommandInteraction} interaction
 */
const handle = async (client, Discord, interaction) => {
    await CreateUserDBIfNotExist(interaction)
    await GetSlashCommands()

    let commandCooldown = checkCommandForCooldown(client, interaction, Discord)
    if (commandCooldown) {
        interaction.reply({ content: `${commandCooldown}`, ephemeral: true })
        return
    }

    let command = slashCommands.filter(command => command.definition.name === interaction.commandName)[0]
    command.execute(interaction)

}

module.exports = (client, Discord, interaction) => {
    handle(client, Discord, interaction)
};

