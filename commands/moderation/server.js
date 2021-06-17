module.exports = {
	name: 'server',
	description: 'send server info',
	execute(client, message, args, Discord) {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};


/*
If you need to access your client instance from inside one of your command files, you can access it via message.client.
If you need to access external files, modules, etc., you should re-require them at the top of the file.
*/