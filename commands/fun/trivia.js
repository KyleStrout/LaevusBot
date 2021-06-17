const { Message } = require('discord.js')
const fetch = require('node-fetch')
const triviaModel = require('../../models/triviaSchema')

/** 
 * @param {Message} message The user message 
 * @param {Array} args The command arguments
 */


async function get_Trivia() {


}

// update question in db, get trivia from api

async function execute(client, message, args, Discord) {
    let generatedQuestion = "yo"
    let generatedAnswer = ""

    fetch("https://numbersapi.p.rapidapi.com/random/trivia?json=true&fragment=true&max=20&min=10", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0acac537f2msh6f343358ba73dd4p125502jsn473a06834b54",
            "x-rapidapi-host": "numbersapi.p.rapidapi.com"
        }
    })
        .then(response => {
            response.json().then(async (json) => {
                generatedQuestion = json['text']
                generatedAnswer = json['number']
                message.channel.send(generatedQuestion)
                //message.channel.send(generatedAnswer)
                let triviaData;
                try {
                    triviaData = await triviaModel.findOne({ id: 1 })
                    if (!triviaData) {
                        let profile = await triviaModel.create({
                            question: generatedQuestion,
                            answer: generatedAnswer,
                            id: 1,
                            state: "ready",
                        })
                    }
                    else if (triviaData) {
                        const query = { id: 1 }
                        const options = { upsert: true }
                        const replacement = {
                            question: generatedQuestion,
                            answer: generatedAnswer,
                            id: 1,
                            state: "ready",
                        }
                        const result = await triviaModel.replaceOne(query, replacement, options)
                    }
                } catch (err) {
                    console.log(err)
                }
            })
        })
        .catch(err => {
            console.error(err);
        });



}

module.exports = {
    name: 'trivia',
    description: 'Trivia questions',
    aliases: [],
    execute: execute,
};