// Import discord.js library and load dotenv module
const Discord = require('discord.js');
// Initialize the client and get the bot token from environment variables
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
const token =' '; //bot token

// Load the required modules
const axios = require('axios');

// When the client is ready, log a message
client.on('ready', () => {
console.log('Bot is ready !');
});

// When the client receives an interaction, handle it
client.on('interactionCreate', async interaction => {
// If the interaction is not a command, ignore it.
if (!interaction.isCommand()) return;

// Get the command name and options.
const { commandName, options } = interaction;

// Check the command name
if (commandName === 'ping') {
    // Get the current gateway latency
    const latency = client.ws.ping;
    // Get the hosting provider name
    const provider = ' '; //idc服务商
    // Get the IP address of the server
    const ip = await axios.get('https://api.ipify.org/?format=json');
    // Get the location of the IP address
    const location = await axios.get(`https://freegeoip.app/json/${ip.data.ip}`);

    // Build the reply message
    const message = `Pong! Latency: ${latency} ms. Hosting provider: ${provider}. \nServer IP: ${ip.data.ip}, Location: ${location.data.city}, ${location.data.region_name}, ${location.data.country_name}`;
    // Reply to the interaction
    await interaction.reply(message);
}
else if (commandName === 'avatar') {
    // Get the mentioned user from the options
    const user = options.getUser('user');

    // If no user is provided, use the interaction user.
    if (!user) {
        user = interaction.user;
    }

    // Get the user's avatar with a 1024x1024 size
    const avatar = user.displayAvatarURL({ format: 'png', size: 1024 });

    // Build the reply message
    const message = `Here's the avatar of ${user.username}: ${avatar}`;

    // Reply to the interaction
    await interaction.reply(message);
}
});

// Login to Discord with the bot token
client.login(token);
