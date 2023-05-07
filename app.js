// Import the discord.js library
const Discord = require('discord.js');
 require('dotenv').config();

// Create a new client instance
const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });
// Get the bot token from the environment variable
const token = ''; //BOT token


// When the client is ready, log a message
client.once('ready', () => {
  console.log('Ready!');
});

// When the client receives an interaction, handle it
client.on('interactionCreate', async interaction => {
  // If the interaction is not a command, ignore it
  if (!interaction.isCommand()) return;
  // Get the command name and options
  const { commandName, options } = interaction;
  // If the command is ping, reply with latency and hosting provider
  if (commandName === 'ping') {
    // Get the current gateway latency
    const latency = client.ws.ping;
    // Get the hosting provider name
    const provider = ''; //托管商
    // Build the reply message
    const message = `Pong! Latency: ${latency} ms. Hosting provider: ${provider}.`;
    // Reply to the interaction
    await interaction.reply(message);
  }
});

// Login to Discord with the bot token
client.login(token);