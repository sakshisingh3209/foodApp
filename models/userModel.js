const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {

        type: Array
    },
    phone: {
        type: String,
        required: true,

    },
    userType: {
        type: String,
        required: true,
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver']
    },
    profile: {
        type: String,
        default: 'https://www.google.com/imgres?q=user%20profile%20image&imgurl=https%3A%2F%2Fi.pinimg.com%2F736x%2F0d%2F64%2F98%2F0d64989794b1a4c9d89bff571d3d5842.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpin%2Fdefault-avatar-profile-icon-of-social-media-user--947022627871095943%2F&docid=pzf4gHwYzq_sAM&tbnid=C0g6zp1t-ntXkM&vet=12ahUKEwjModnFy8aGAxUr2TgGHcQ2C3sQM3oECFcQAA..i&w=736&h=736&hcb=2&ved=2ahUKEwjModnFy8aGAxUr2TgGHcQ2C3sQM3oECFcQAA'
    }
}, { timestamps: true });



module.exports = mongoose.model('User', userSchema);