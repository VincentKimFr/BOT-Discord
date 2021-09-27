module.exports = {
    data: 
    {
        name: 'off',
        description: 'Stop le bot. Réservé aux developpeurs.',
        type: 'CHAT_INPUT',
        defaultPermission: false,
    },
    async execute(interaction) {
        await interaction.reply({content: 'Extinction.', fetchReply: false}).catch(sendError);
        await console.log('Bot stop...');
        await sleep(1000);
        await interaction.client.destroy();
        await sleep(5000);
        await console.log('Bot stoped.');
        await process.exit();
    },
};