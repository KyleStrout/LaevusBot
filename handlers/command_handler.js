const fs = require('fs')
module.exports = (client, Discord) => {
    // Get folders
    const commandFolders = fs.readdirSync('./commands');
    const command_files = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    // For files in each folder, register the commands
    for (const folder of commandFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

        // For each file in folder, register command
        for (const file of commandFiles) {
            // Import command, register
            const command = require(`../commands/${folder}/${file}`);
            if (command.name) {
                client.commands.set(command.name, command)
            }
            else {
                continue
            }
        }
    }
}