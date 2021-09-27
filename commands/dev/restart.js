module.exports =
{
        data:
        {
                name: 'redémarrer',
                description: 'Redémarre le bot. Réservé aux developpeurs.',
                defaultPermission: false,
        },
        async execute(interaction)
        {
            token = interaction.client.token;
            await interaction.reply({content: 'Redémarrage du bot', fetchReply: false}).catch(sendError);
            await sendDev('Bot stop.');
            await interaction.client.destroy();
            await console.log('Bot start.');
            await sleep(1500);
            await interaction.client.login(token).catch(sendError);
            await sendDev('Bot started.');
        },
};