const UserRole = require('../models/userRole');

async function getUserRole(req, res, next) {
    let userRole;
    try {
        userRole = await UserRole.findById(req.params.id)
        if (userRole == null) {
            return res.status(404) // not bulundu
                .json({ message: 'Product not found' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.userRole = userRole;
    next();
}

module.exports = getUserRole;

