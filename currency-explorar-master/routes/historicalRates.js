const express = require('express');
const router = express.Router();
const historicalRatesController = require('../controller/historicalRatesController');

router.get('/', historicalRatesController.getHistoricalRates);

module.exports = router;