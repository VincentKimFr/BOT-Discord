module.exports =
{
    data:
    {
        name: 'clear',
        description: 'Supprime tout les messages du salon. Réservé aux developpeurs.',
        defaultPermission: false,
    },
    async execute(interaction)
    {
        const channel = await interaction.client.channels.cache.get(interaction.channelId)
            ?? await interaction.client.channels.fetch(interaction.channelId).catch(sendError);
        const commandUser = await interaction.member.user.id;

        filter = (reaction, user) => {
            return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === commandUser;
        };

        abort = async (collected, msg) => {

            await msg.edit("Opération annulée.\n(Message à 5 secondes de durée.)").catch(sendError);
            msg.awaitReactions({filter, max: 1, time: 5000})
                .then((collected)=> {
                    msg.delete().catch(sendError);
                })
            .catch(collected => {
                msg.delete().catch(sendError);
            }).catch(sendError);
        };

        await interaction.reply({content: `Confirmez pas réaction que vous souhaitez supprimer **TOUT** \
les messages du salon : **${interaction.channel.name}**.\n(15 secondes pour confirmer avant annulation)\n✅ : Oui\n❌ : Non`,
            fetchReply: true})
        .then(async (APImsg) =>
        {
                const msg = channel.messages.cache.get(APImsg.id) ?? await channel.messages.fetch(APImsg.id).catch(sendError);
                msg.awaitReactions({filter, max: 1, time: 15000})
                .then(async (collected) =>
                {
                    if (collected.first().emoji.name === '✅') {
                        var deletedMessages;
                        do {
                            collectedMessages = await channel.messages.fetch({limit : 99}).catch(sendError);
                            if (collectedMessages.size > 0)
                                deletedMessages = await channel.bulkDelete(collectedMessages.size, true).catch(sendError);
                            else
                                deletedMessages.size = 0
                        } while (deletedMessages.size > 0);
                    } else {
                        collected.first().users.remove(userId).catch(sendError);
                        await abort(collected, msg);
                    }
                }).catch(async collected =>
                {
                    await abort(collected, msg);
                }).catch(sendError);

            await msg.react('✅').catch(sendError);
            await msg.react('❌').catch(sendError);
        }).catch(sendError);
    }
};