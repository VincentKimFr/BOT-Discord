module.exports = async (guild) =>
{
    const filePerms = require('./commands/total_perm.js');
    const commandsArray = [];
    var count = 0;

    guild.client.commands.each(command => commandsArray.push(command.data));

    var commandsCollec = await client.application.commands.set(commandsArray, CONFIG.guildId).catch(sendError);
    sendDev('[Succes] Commands deployed.');

    commandsCollec.each(command => {
        count = filePerms.data.names.indexOf(command.name);
        if (count === -1) {
            sendError("Command name " + command.name + " doesn’t exist in file ./commands/perm/total_perm.js.data.names"); }
        else {
            filePerms.perms.fullPermissions[count].id = command.id; }
    });

    guild.commands.permissions.set(filePerms.perms).catch(sendError);
    sendDev('[Succes] Commands permissions deployed.');

};