// Import Express dan modul lainnya
const express = require('express');
const authMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const digitalBankingController = require('./digitalbank-controller');
const digitalBankingValidator = require('./digitalbank-validator');

// Buat objek router
const route = express.Router();

// Atur rute untuk layanan digital banking
module.exports = (app) => {
    app.use('/digitalbanking', route);

    // Tambah layanan digital banking
    route.post(
        '/',
        authMiddleware,
        celebrate(digitalBankingValidator.createDigitalBanking),
        digitalBankingController.createDigitalBanking
    );

    // Ambil daftar layanan digital banking
    route.get(
        '/',
        authMiddleware,
        digitalBankingController.getDigitalBankings
    );

    // Perbarui layanan digital banking
    route.put(
        '/:id',
        authMiddleware,
        digitalBankingController.updateDigitalBanking
    );

    // Hapus layanan digital banking
    route.delete(
        '/:id',
        authMiddleware,
        digitalBankingController.deleteDigitalBanking
    );
};
