// Import layanan digital banking dan pengelola kesalahan
const digitalBankingService = require('./digitalbank-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

// Buat layanan digital banking
async function createDigitalBanking(req, res, next) {
  try {
    const { name, description, price, benefits, features } = req.body;

    const created = await digitalBankingService.createDigitalBanking(
      name,
      description,
      price,
      benefits,
      features
    );

    if (!created) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gagal membuat layanan digital banking'
      );
    }

    return res
      .status(200)
      .json({ name, description, price, benefits, features });
  } catch (error) {
    return next(error);
  }
}

// Ambil daftar layanan digital banking
async function getDigitalBankings(req, res, next) {
  try {
    const bankings = await digitalBankingService.getDigitalBankings();
    return res.status(200).json(bankings);
  } catch (error) {
    return next(error);
  }
}

// Perbarui layanan digital banking
async function updateDigitalBanking(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description, price, benefits, features } = req.body;

    const updated = await digitalBankingService.updateDigitalBanking(
      id,
      name,
      description,
      price,
      benefits,
      features
    );

    if (!updated) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gagal memperbarui layanan digital banking'
      );
    }

    return res.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

// Hapus layanan digital banking
async function deleteDigitalBanking(req, res, next) {
  try {
    const { id } = req.params;

    const deleted = await digitalBankingService.deleteDigitalBanking(id);

    if (!deleted) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Gagal menghapus layanan digital banking'
      );
    }

    return res.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

// Ekspor fungsi kontroler
module.exports = {
  createDigitalBanking,
  getDigitalBankings,
  updateDigitalBanking,
  deleteDigitalBanking,
};
