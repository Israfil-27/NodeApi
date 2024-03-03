const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    normalizedName: { type: String, required: false },

}, { collection: 'Roles' });

roleSchema.pre('save', async function (next) {
    
    if (this.isModified('name')) { 
        this.name = this.name.toLowerCase();
        this.normalizedName = this.name.toUpperCase(); 
    }

    next();
});

module.exports = mongoose.model('Role', roleSchema);