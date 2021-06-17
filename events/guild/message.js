const { prefix, token } = require('../../config.json');
const profileModel = require('../../models/profileSchema')

module.exports = async (client, Discord, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        // increment message counter
        try {
            await profileModel.findOneAndUpdate({
                userID: message.author.id,
            }, {
                $inc: {
                    messageCount: 1
                }
            })
        } catch (err) {
            console.log(error)
        }

        return;
    }

    // when a user uses a command adds them to the db
    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id })
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0,
                messageCount: 0,
            })
        }
    } catch (err) {
        console.log(err)
    }
    // increment message counter
    try {
        await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                messageCount: 1
            }
        })
    } catch (err) {
        console.log(err)
    }


    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    //console.log('yo')
    //console.log(command)
    if (!command) return;

    if (command.args && !args.length) {
        let replyContent = 'You didn\'t provide any arguments'
        // let reply = message.channel.send(`You didn't provide any arguments, ${message.author}!`);

        if (command.usage) {
            replyContent += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }
        return message.reply(replyContent);
    }

    try {
        command.execute(client, message, args, Discord, profileData);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
};