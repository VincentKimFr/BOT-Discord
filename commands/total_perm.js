var devsPerm = require('./perm/devs_perm.js').permissions;
module.exports =
{
    data:
    {
        names:
        [
            "redémarrer",
            "off",
            "clear",
        ]
    },
    perms:
    { 
        fullPermissions:
        [
            {
                id: '840721630316724238', //redémarrer
                permissions: devsPerm
            },
            {
                id: '886632004387504149', //off
                permissions: devsPerm
            },
            {
                id: '841437173760655361', //clear
                permissions: devsPerm
            },
        ]
    }
};