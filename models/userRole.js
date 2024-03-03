const mongoose = require('mongoose');

const userRolesSchema = new mongoose.Schema({
    roleId: { type: mongoose.Types.ObjectId, required: true, ref: 'Role' },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    expireDate: { type: Date, required: false }

}, { collection: 'UserRoles' });

module.exports = mongoose.model('UserRole', userRolesSchema);
