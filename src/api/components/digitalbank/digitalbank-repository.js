// Import model DigitalBanking
const { DigitalBanking } = require('../../../models');

// Buat layanan digital banking
async function createDigitalBanking(name, description, price, benefits, features) {
    return DigitalBanking.create({ name, description, price, benefits, features });
}

// Ambil daftar layanan digital banking
async function getDigitalBanking() {
    return DigitalBanking.find({});
}

// Perbarui layanan digital banking
async function updateDigitalBanking(id, name, description, price, benefits, features) {
    return DigitalBanking.updateOne(
        { _id: id },
        {
            $set: {
                name,
                description,
                price,
                benefits,
                features,
            },
        }
    );
}

// Hapus layanan digital banking
async function deleteDigitalBanking(id) {
    return DigitalBanking.deleteOne({ _id: id });
}

// Ekspor fungsi-fungsi
module.exports = {
    createDigitalBanking,
    getDigitalBanking,
    updateDigitalBanking,
    deleteDigitalBanking,
};
