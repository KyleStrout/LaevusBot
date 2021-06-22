const profileModel = require('../../models/profileSchema')
const { Message, MessageEmbed, CommandInteraction } = require('discord.js')
const EmbedColors = require('../../helpers/EmbedColors')
const CommandTypes = require('../../helpers/CommandTypes')
const checkAccount = require('../../helpers/checkAccount')

const listOfValidUserRoles = [
    { id: 855235689855188992, price: 2000, name: 'knight' },
    { id: 855235632783687680, price: 2500, name: 'samurai' },
    { id: 855235551409864715, price: 3000, name: 'baron' },
    { id: 855235497483698176, price: 4000, name: 'shogun' },
    { id: 855235440516530186, price: 5000, name: 'consul' },
    { id: 855235374317568041, price: 6000, name: 'chieftain' },
    { id: 855235274140811276, price: 7000, name: 'emperor' },
    { id: 855235152095084544, price: 8000, name: 'council member' },
    { id: 855235064144461864, price: 9000, name: 'tsar' },
    { id: 855234917130829835, price: 10000, name: 'immortal guard' },
    { id: 855234837471297566, price: 50000, name: 'grandmaster' },
    { id: 855234784372326442, price: 75000, name: 'legend' },
    { id: 855231702276505608, price: 100000, name: 'godlike' }
]

/**
* Handle the command
* @param {CommandInteraction} interaction
*/
const execute = async (interaction) => {
    let profileData = await profileModel.findOne({ userID: interaction.user.id })
    const userChoice = interaction.options.filter(option => option.name === "role").first()
    const validRoleChoice = listOfValidUserRoles.filter(role => role.id.toString() === userChoice.value)[0]

    if (validRoleChoice.price > profileData.coins) {
        let failure = new MessageEmbed()
            // title, desc, color, 
            .setTitle(":x: Failure!")
            .setDescription(`You don't have enough coins in your wallet for that`)
            .setColor(EmbedColors.Discord.RED)
        await interaction.reply({ embeds: [failure], ephemeral: true })
        return
    }
    else {
        // https://discordjs.guide/additional-info/collections.html#array-like-methods
        // This is the best i can find ¯\_(ツ)_/¯
        let guild = (await interaction.client.guilds.fetch(interaction.guild))
        let member = guild.members.cache.filter(member => member.id === interaction.user.id).first()
        let roleName = guild.roles.cache.filter(role => role.name.toLowerCase().startsWith(validRoleChoice.name))
        let roleID = guild.roles.cache.filter(role => role.name.toLowerCase().startsWith(validRoleChoice.name)).first().id

        if (!member.roles.cache.has(roleID)) {
            member.roles.add(roleName)
            let success = new MessageEmbed()
                // title, desc, color, 
                .setTitle(":white_check_mark: Role Added")
                .setDescription(`You have purchased the **${validRoleChoice.name}** role`)
                .setColor(EmbedColors.Discord.GREEN)
            await interaction.reply({ embeds: [success] })

            const response = await profileModel.findOneAndUpdate({
                userID: interaction.user.id,
            }, {
                $inc: {
                    coins: -validRoleChoice.price
                }
            })

            return

        }

        let failure = new MessageEmbed()
            .setTitle(":x: Transaction Failed")
            .setDescription(`You already have the **${validRoleChoice.name}** role`)
            .setColor(EmbedColors.Default.DARK_RED)
        await interaction.reply({ embeds: [failure], ephemeral: true },)
        return




        //interaction.user.roles.add(roleName)


    }


}

module.exports = {
    name: 'purchase',
    description: 'Spend your coins on items from the shop',
    definition: {
        name: 'purchase',
        description: 'Spend your coins on items from the shop',
        options: [
            {
                name: 'role',
                description: 'The Role you want to buy',
                type: CommandTypes.STRING,
                required: true,
                choices: listOfValidUserRoles.map(role => {
                    return {
                        name: `${role.name} - ${role.price}`,
                        value: role.id.toString()
                    }
                })
            }
        ]
    },
    execute
};