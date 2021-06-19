const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')
const profileModel = require('../../models/profileSchema')
const fetch = require('node-fetch')



/** 
 * Handle the roll command
 * @param {Message} message The user message 
 * @param {Array} args The command arguments
 */
async function execute(client, message, args, Discord, profileData) {
    const amount = args[0]
    const outcome = args[1].toLowerCase()

    if (outcome != 'tails' && outcome != 'heads') {
        let response = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Invalid choice")
            .setDescription(`Please enter !coinflip <wager> <heads/tails>`)
            .setColor(EmbedColors.Default.DARK_RED)
        return await message.channel.send({ embed: response, })
    }

    else if (amount % 1 != 0 || amount <= 0) {
        let response = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Invalid wager")
            .setDescription(`Please enter !coinflip <wager> <heads/tails>`)
            .setColor(EmbedColors.Default.DARK_RED)
        return await message.channel.send({ embed: response, })
    }

    fetch("https://coin-flip1.p.rapidapi.com/headstails", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0acac537f2msh6f343358ba73dd4p125502jsn473a06834b54",
            "x-rapidapi-host": "coin-flip1.p.rapidapi.com"
        }
    })
        .then(response => {
            response.json().then(async (json) => {
                let generatedOutcome = json['outcome'].toLowerCase()

                if (outcome == generatedOutcome) {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, {
                        $inc: {
                            coins: amount
                        }
                    })

                    let response = new MessageEmbed()
                        // title, desc, color, 
                        .setTitle(":white_check_mark: You guessed correctly")
                        .setDescription(`Coins Earned: ${amount}`)
                        .setColor(EmbedColors.Discord.GREEN)
                    await message.channel.send({ embed: response, })
                }
                else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, {
                        $inc: {
                            coins: -amount
                        }
                    })
                    let response = new MessageEmbed()
                        // title, desc, color, 
                        .setTitle(":x: You guessed wrong")
                        .setDescription(`Coins Lost: ${amount}`)
                        .setColor(EmbedColors.Default.RED)
                    await message.channel.send({ embed: response, })
                }

            })
        })
        .catch(err => {
            console.error(err);
        });






}

module.exports = {
    name: 'coinflip',
    description: 'Wager on flipping a coin, goodluck :)',
    aliases: ['coin', 'flip'],
    args: true,
    execute: execute,
};