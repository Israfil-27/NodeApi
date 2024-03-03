const Permission = require('../models/permission');

async function getPermission(req, res, next) {
    let permission;
    try {
        permission = await Permission.findById(req.params.id)
        if (permission == null) {
            return res.status(404) // not bulundu
                .json({ message: 'Permission not found' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.permission = permission;
    next();
}

module.exports = getPermission; 