const express = require('express');
const router = express.Router();
const exchangeRatesController = require('../controller/exchangeRatesController');

// Route handler for GET /exchange-rates
router.get('/rates',exchangeRatesController.getExchangeRates);

module.exports = router;
