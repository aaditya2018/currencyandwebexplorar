const { getDb } = require('../db/connection');

async function getHistoricalRates(req, res) {
  try {
    const { base_currency, target_currency, start, end } = req.query;

    if (!base_currency || !start || !target_currency) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const db = getDb();
    const collection = db.collection('exchangeRates'); // Replace with your collection name

    const query = {
      timestamp: {
        $gte: new Date(parseInt(start)).getTime(),
        $lte: end ? new Date(parseInt(end)).getTime() : new Date().getTime(),
      },
    };

    const results = await collection.find(query).toArray();
    console.log("results",results);
    if (results.length === 0) {
      return res.status(404).json({ error: 'No historical rates found' });
    }
    

    // Assuming the rates are stored in the database as an array of objects with timestamp and rate properties
    const historicalRates = results.map((result) => ({
      timestamp: result.timestamp,
      rate: result.rates[base_currency.toUpperCase()][target_currency.toUpperCase()],
    }));

    return res.status(200).json({ historicalRates });
  } catch (err) {
    console.error('Error fetching historical rates:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getHistoricalRates,
};
