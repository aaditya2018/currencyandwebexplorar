const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const dbName = 'currancy_explorar'; // Replace with your desired database name
const historicalRatesRoutes = require('./routes/historicalRates');
const exchangeRatesRoutes = require('./routes/exchangeRates');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const db = require('./db/connection');
const updateCurrencyRates = require('./controller/updateCurrencyRates');

db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


setInterval(()=>{
  updateCurrencyRates();
},500)

app.use('/historical-rates', historicalRatesRoutes);
app.use('/exchange-rates', exchangeRatesRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
