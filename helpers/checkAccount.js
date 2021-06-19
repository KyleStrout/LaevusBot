const profileModel = require('../models/profileSchema')
const { Message, MessageEmbed } = require('discord.js')
const EmbedColors = require('../helpers/EmbedColors')


/**
 * Check if a user can buy a role
 * @param {int} amount 
 * @param {*} profileData 
 * @param {Message} message 
 * @returns {Boolean} Whether or not they can buy a role
 */
async function isValid(amount, profileData, message) {
    console.table([amount, profileData.coins, amount > profileData.coins])
    if (amount > profileData.coins) return false

    try {
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                coins: -amount,
            }
        })
        return true
    } catch (err) {
        console.log(err)
    }
}




module.exports = {
    isValid: isValid,
}