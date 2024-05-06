const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const digitalBankingSchema = require('./digitalBanking-schema');

// Menghubungkan ke database
mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

// Mencatat koneksi yang berhasil
const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

// Mendefinisikan model untuk pengguna dan layanan perbankan digital
const User = mongoose.model('users', mongoose.Schema(usersSchema));
const DigitalBanking = mongoose.model('digitalbanking', mongoose.Schema(digitalBankingSchema));

// Mengekspor modul
module.exports = {
  mongoose,
  User,
  DigitalBanking,
};
