const { getDb } = require('../db/connection');
const updateCurrencyRates = require('./updateCurrencyRates');

// Sample data for crypto rates
const cryptoRates = {
    USD: { BTC: '0.000032', DOGE: '11.42', ETH: '0.00049' },
    SGD: { BTC: '0.000023', DOGE: '8.72', ETH: '0.00034' },
    EUR: { BTC: '0.000034', DOGE: '12.84', ETH: '0.00052193' },
};

// Sample data for fiat rates
const fiatRates = {
    USD: { BTC: '29717.50', DOGE: '0.084', ETH: '2022.43' },
    SGD: { BTC: '40873.42', DOGE: '0.12', ETH: '2853.29' },
    EUR: { BTC: '27519.47', DOGE: '0.075', ETH: '1945.12' }
};

async function getExchangeRates(req, res) {
  try {
    const { base } = req.query;

    if (!base) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const db = getDb();
    const collection = db.collection('exchangeRates');
    // main
    if (base.toLowerCase() === 'fiat') {
      let fiatData = await collection.find({currency: base}).toArray();
      res.json(fiatData);
    } else if (base.toLowerCase() === 'crypto') {
      let cryptoData = await collection.find({ currency: base }).toArray();
      res.json(cryptoData);
    } else {
      res.status(400).json({ error: 'Invalid base parameter. Use "fiat" or "crypto".' });
    }
  } catch (err) {
    console.error('Error fetching historical rates:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getExchangeRates,
};
