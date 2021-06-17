const { Message } = require('discord.js')
const fetch = require('node-fetch')

/* python
def getQuote():
  response = requests.get('https://zenquotes.io/api/random')
  json_data = json.loads(response.text)
  print(json_data)
  quote = json_data[0]['q'] + " -" + json_data[0]['a']
  return quote
*/


/** 
 * Handle the roll command
 * @param {Message} message The user message 
 * @param {Array} args The command arguments
 */
async function execute(client, message, args, Discord) {
    fetch("https://zenquotes.io/api/random", {
        "method": "GET",
    })
        .then(response => {
            response.json().then(async (json) => {
                let quote = json[0]
                message.channel.send(quote.q + ' -' + quote.a)
            })
        })
        .catch(err => {
            console.error(err)
        })

}

module.exports = {
    name: 'quote',
    description: 'Gets a random quote',
    aliases: ['quote'],
    execute: execute,
};