module.exports =
{
    permissions:
    [
        {
            id: CONFIG.ownerUserId,
            type: 'USER',
            permission: true,
        },
        {
            id: CONFIG.devWebUserId,
            type: 'USER',
            permission: true,
        },
    ]
}