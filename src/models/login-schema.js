const mongoose = require('mongoose');

// Skema untuk menyimpan percobaan login
const loginAttemptSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    attempts: {
        type: Number,
        required: true,
        default: 1,
    },
    lastAttempt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

// Membuat model LoginAttempt menggunakan skema di atas
const LoginAttempt = mongoose.model('LoginAttempt', loginAttemptSchema);

// Mengekspor model untuk digunakan di bagian lain aplikasi
module.exports = LoginAttempt;
