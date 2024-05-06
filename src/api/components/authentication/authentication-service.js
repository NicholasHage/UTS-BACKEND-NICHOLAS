const authenticationRepo = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');
const LoginAttempt = require('../../../models/login-schema');

/**
 * Memproses percobaan login yang gagal.
 * @param {string} email - Email pengguna.
 * @param {string} password - Kata sandi pengguna.
 * @returns {object} Objek percobaan login.
 */
async function handleFailedLoginAttempt(email, password) {
  try {
    let attempt = await LoginAttempt.findOne({ email, password });

    if (!attempt) {
      attempt = new LoginAttempt({ email, password });
    }

    attempt.attempts += 1;
    attempt.lastAttempt = Date.now();

    await attempt.save();
    return attempt;
  } catch (err) {
    throw new Error('Terjadi kesalahan saat menangani percobaan login.');
  }
}

/**
 * Menghapus percobaan login yang terkait dengan pengguna.
 * @param {string} email - Email pengguna.
 * @param {string} password - Kata sandi pengguna.
 */
async function clearLoginAttempts(email, password) {
  try {
    await LoginAttempt.deleteOne({ email, password });
  } catch (err) {
    throw new Error('Terjadi kesalahan saat menghapus data percobaan login.');
  }
}

/**
 * Memeriksa kredensial login pengguna.
 * @param {string} email - Email pengguna.
 * @param {string} password - Kata sandi pengguna.
 * @returns {object} Jika kredensial valid, objek berisi token dan detail pengguna; jika tidak, mengembalikan null.
 */
async function checkLoginCredentials(email, password) {
  try {
    const user = await authenticationRepo.getUserByEmail(email);
    const storedPassword = user ? user.password : '';

    // Periksa apakah password yang diinput cocok dengan password yang tersimpan
    const passwordIsValid = await passwordMatched(password, storedPassword);

    if (user && passwordIsValid) {
      // Bersihkan data percobaan login
      await clearLoginAttempts(email, password);

      // Kembalikan detail pengguna dan token
      return {
        email: user.email,
        name: user.name,
        userId: user.id,
        token: generateToken(user.email, user.id),
      };
    }

    // Tangani percobaan login yang gagal
    await handleFailedLoginAttempt(email, password);
    return null;
  } catch (err) {
    throw new Error('Terjadi kesalahan saat memeriksa kredensial login.');
  }
}

// Ekspor fungsi checkLoginCredentials
module.exports = {
  checkLoginCredentials,
};
