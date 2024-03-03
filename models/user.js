const mongoose = require('mongoose');
const bcyrpt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },

}, { collection: 'Users' });

userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcyrpt.hash(this.password, 8);
    }

    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailRegex.test(this.email)) {
        return next(new Error('Email is not valid'));
    }

    next();
});

module.exports = mongoose.model('User', userSchema);