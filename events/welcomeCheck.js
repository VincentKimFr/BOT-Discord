module.exports = async(client, channelid, messageid) => {

    const channel = client.channels.cache.get(channelid) ?? await client.channels.fetch(channelid)
        .then(channel => {
            msg = channel.messages.cache.get(messageid) ?? channel.messages.fetch(messageid)
                .then(msg => {
                    msg.react('📑').catch(sendError);
                }).catch(sendError);
        }).catch(sendError);
}