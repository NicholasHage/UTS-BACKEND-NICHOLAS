// Import modul Joi
const joi = require('joi');

// Aturan validasi untuk pembuatan layanan digital banking
const createDigitalBankingValidator = {
    body: {
        name: joi.string().required().label('Name'),
        description: joi.string().required().label('Description'),
        price: joi.number().required().label('Price'),
        benefits: joi.string().required().label('Benefits'),
        features: joi.string().required().label('Features'),
    },
};

// Ekspor validator
module.exports = {
    createDigitalBanking: createDigitalBankingValidator,
};
