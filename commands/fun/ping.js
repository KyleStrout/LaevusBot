module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['pong'],
	//cooldown: 5,
	execute(client, message, args, Discord) {
		message.channel.send('Pong.');
	},
};
