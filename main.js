global.CONFIG = require('./config.js');
const {Client, Intents, Collection} = require('discord.js');
const fs = require('fs');
const myIntents = new Intents();

myIntents.add(Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS);

client = new Client({ intents: myIntents});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands/dev').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/dev/${file}`);
    client.commands.set(command.data.name, command);
}

client.once('ready', async() => {

    var guild = client.guilds.cache.get(CONFIG.guildId) ?? await client.guilds.fetch(CONFIG.guildId).catch(sendError);

    //await require('./deploy_commands.js')(guild);

    var commandsCollec = await guild.commands.fetch().catch(sendError);
    commandsCollec.each(command => sendDev("default perm : " + command.defaultPermission + ", name : " + command.name +
        ", type : " + command.type + ", id : " + command.id));

    await require('./events/welcomeCheck.js')(client, CONFIG.welcomeChannelId, CONFIG.welcomeMsgId);
    require('./events/ready.js')(client);
});

client.on('messageCreate', require('./events/message.js'));
//client.on("raw", console.log);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName } = interaction;

    //const args = interaction.data.options;

    try {
        const command = client.commands.get(interaction.commandName);
        await command.execute(interaction);
    } catch (error) {
        sendError(error);
        await interaction.reply({ content: 'Erreur en executant la commande', ephemeral: true });
    }

});

global.sendDev = async (txt) =>
{
    console.log("DEV : " + txt);
    const channel = await client.channels.fetch(CONFIG.devChannel).then(async channel => {
        channel.send("DEV : " + txt, client);
    });
}

global.sendError = async (error) =>
{
    console.log(error);
    const channel = await client.channels.fetch(CONFIG.errorChannel).then(async channel => {
        channel.send('ERR : ' + error.stack);
    });
}

global.sendWarn = async (warn) =>
{
    console.log("WARN : " + warn);
    const channel = await client.channels.fetch(CONFIG.warnChannel).then(async channel => {
        channel.send("WARN : " + warn);
    });
}

global.sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.on('error', sendError);
client.on('warn', sendWarn);
client.login(CONFIG.TOKEN).catch(sendError);