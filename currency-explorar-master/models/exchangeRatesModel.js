const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
    currency: String,
    rates: {
      USD: Object,
      SGD: Object,
      EUR: Object,
    },
    timestamp: {
      type: mongoose.Schema.Types.Number,
      default: Date.now,
      immutable: true,
      required: true,
    }
});

// const exchangeRatesModel = mongoose.model('Currency', currencySchema);

// module.exports = exchangeRatesModel;
module.exports = mongoose.model("exchangeRates", currencySchema);
