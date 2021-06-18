const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const mongoose = require('mongoose');
require('dotenv').config();


const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
})

//['command_handler', 'events_handler'].forEach(handler => {
//     require(`./handlers/${handlers}`)(client, Discord)
// })
// const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// for (const file of eventFiles) {
//     const event = require(`./events/${file}`);
//     if (event.once) {
//         client.once(event.name, (...args) => event.execute(...args, client));
//     } else {
//         client.on(event.name, (...args) => event.execute(...args, client));
//     }
// }



// const commandFolders = fs.readdirSync('./commands');

// for (const folder of commandFolders) {
//     const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
//     for (const file of commandFiles) {
//         const command = require(`./commands/${folder}/${file}`);
//         client.commands.set(command.name, command);
//     }
// }


/*
                commands with user input args
else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        message.channel.send(`Command name: ${command}\nArguments: ${args}`);
    }

    interact with it with args[0] etc.
*/

mongoose.connect(process.env.MONGODB_SRV, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("connected to the database")
    })
    .catch((err) => {
        console.log(err)
    })

client.login(token);