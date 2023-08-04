const axios = require('axios');
const ExchangeRatesModel = require('../models/exchangeRatesModel');
const { getDb } = require('../db/connection');

const fetchCurrencyData = async () => {
  try {
    const currancies = ["crypto"]
    const finalResponse = await Promise.all(currancies.map(async (currancy) => {
      const response = await axios({
        url: `https://api.coinbase.com/v2/exchange-rates?currency=${currancy}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: "GET"
      });
      if (response?.data) {
        const rate = response?.data?.data;
        const BTC = rate.rates['BTC'];
        const DOGE = rate.rates['DOGE'];
        const ETH = rate.rates['ETH'];
        return {
          currency: currancy,
          rates: {
            USD: { BTC: BTC, DOGE: DOGE, ETH: ETH },
            SGD: { BTC: BTC, DOGE: DOGE, ETH: ETH },
            EUR: { BTC: BTC, DOGE: DOGE, ETH: ETH },
          }
        };
      }
    }
    )
    )
    return finalResponse.filter(Boolean);
  } catch (err) {
    console.error('Error fetching currency data:', err.message);
    return null;
  }
};

const updateCurrencyRates = async (data = null) => {
  let latestData;
  if (data) {
    latestData = [data];
  } else {
    latestData = await fetchCurrencyData();
  }
  if (latestData?.length) {
    try {
      // const currentDate = new Date();
      return Promise.all(latestData.map(async (list) => {
        const rates = new ExchangeRatesModel(list);
        const db = getDb();
        const collection = db.collection("exchangeRates");
        await collection.insertOne(rates);
        return rates;
      }))
    } catch (err) {
      console.error('Error updating currency data:', err.message);
    }
  } else {
    console.error('Failed to fetch currency data from the external API.');
  }
};

module.exports = updateCurrencyRates;
