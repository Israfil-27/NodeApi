const Role = require('../models/role');

async function getRole(req, res, next) {
    let role;
    try {
        role = await Role.findById(req.params.id)
        if (role == null) {
            return res.status(404)  
                .json({ message: 'Role not found' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.role = role;
    next();  
}

module.exports = getRole; 