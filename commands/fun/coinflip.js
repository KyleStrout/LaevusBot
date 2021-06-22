const { CommandInteraction, Message, MessageEmbed, Client } = require('discord.js');
const EmbedColors = require('../../helpers/EmbedColors')
const CommandTypes = require('../../helpers/CommandTypes')
const profileModel = require('../../models/profileSchema')
const fetch = require('node-fetch')

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {
    let profileData = await profileModel.findOne({ userID: interaction.user.id })
    const wager = interaction.options.get('wager').value
    const side = interaction.options.get('side').value

    let isHeads = String(side).includes('HEADS')
    if (isHeads) {

    }
    // if (outcome != 'tails' && outcome != 'heads') {
    //     let response = new MessageEmbed()
    //         // title, desc, color, 
    //         .setTitle(":x: Invalid choice")
    //         .setDescription(`Please enter !coinflip <wager> <heads/tails>`)
    //         .setColor(EmbedColors.Default.DARK_RED)
    //     return await message.channel.send({ embed: response, })
    // }

    if (wager % 1 != 0 || wager <= 0) {
        let failure = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Failure!")
            .setDescription(`You cant wager a negative amount of coins`)
            .setColor(EmbedColors.Discord.RED)
        await interaction.reply({ embeds: [failure], ephemeral: true })
        return
    }
    if (wager > profileData.bank) {
        await interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(':x: Failure')
                    .setDescription(`You don't have that amount in your bank to wager`)
                    .setColor(EmbedColors.Discord.RED)
            ], ephemeral: true
        })
        return
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

                if (side.toLowerCase() == generatedOutcome) {
                    await profileModel.findOneAndUpdate({
                        userID: interaction.user.id
                    }, {
                        $inc: {
                            coins: wager
                        }
                    })

                    let response = new MessageEmbed()
                        // title, desc, color, 
                        .setTitle(":white_check_mark: You guessed correctly")
                        .setDescription(`Coins Earned: ${wager}`)
                        .setColor(EmbedColors.Discord.GREEN)
                    await interaction.reply({ embeds: [response], })
                }
                else {
                    await profileModel.findOneAndUpdate({
                        userID: interaction.user.id
                    }, {
                        $inc: {
                            coins: -wager
                        }
                    })
                    let response = new MessageEmbed()
                        // title, desc, color, 
                        .setTitle(":x: You guessed wrong")
                        .setDescription(`Coins Lost: ${wager}`)
                        .setColor(EmbedColors.Default.RED)
                    await interaction.reply({ embeds: [response], })
                }

            })
        })
        .catch(err => {
            console.error(err);
        });

}

module.exports = {
    name: 'coinflip',
    description: 'Flip a coin!',
    definition: {
        name: 'coinflip',
        description: 'Flip a coin!',
        options: [
            {
                name: 'wager',
                description: 'The wager you want to wager',
                type: CommandTypes.INTEGER,
                required: true
            },
            {
                name: 'side',
                description: 'Heads or tails',
                type: CommandTypes.STRING,
                required: true,
                choices: [
                    {
                        name: 'Heads',
                        value: 'HEADS'
                    },
                    {
                        name: 'Tails',
                        value: 'TAILS'
                    }
                ]
            },
        ]
    },
    execute
};
