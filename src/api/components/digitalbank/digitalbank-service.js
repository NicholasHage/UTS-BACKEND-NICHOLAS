// Import repository
const digitalBankingRepository = require('./digitalbank-repository');

// Buat layanan digital banking
async function createDigitalBanking(name, description, price, benefits, features) {
    try {
        await digitalBankingRepository.createDigitalBanking(name, description, price, benefits, features);
    } catch (err) {
        return null;
    }
    return true;
}

// Ambil daftar layanan digital banking
async function getDigitalBankings() {
    const digitalBankings = await digitalBankingRepository.getDigitalBanking();

    const results = [];
    for (const digitalBanking of digitalBankings) {
        results.push({
            id: digitalBanking.id,
            name: digitalBanking.name,
            description: digitalBanking.description,
            price: digitalBanking.price,
            benefits: digitalBanking.benefits,
            features: digitalBanking.features,
        });
    }

    return results;
}

// Perbarui layanan digital banking
async function updateDigitalBanking(id, name, description, price, benefits, features) {
    const digitalBanking = await digitalBankingRepository.getDigitalBanking(id);

    if (!digitalBanking) {
        return null;
    }

    try {
        await digitalBankingRepository.updateDigitalBanking(id, name, description, price, benefits, features);
    } catch (err) {
        return null;
    }
    return true;
}

// Hapus layanan digital banking
async function deleteDigitalBanking(id) {
    const digitalBanking = await digitalBankingRepository.getDigitalBanking(id);

    if (!digitalBanking) {
        return null;
    }

    try {
        await digitalBankingRepository.deleteDigitalBanking(id);
    } catch (err) {
        return null;
    }
    return true;
}

// Ekspor fungsi-fungsi
module.exports = {
    createDigitalBanking,
    getDigitalBankings,
    updateDigitalBanking,
    deleteDigitalBanking,
};
