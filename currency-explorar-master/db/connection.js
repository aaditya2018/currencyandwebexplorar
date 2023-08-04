const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB URI
const dbName = 'Currancy-Explorar'; // Replace with your desired database name

let db;
async function connect() {
  try {
    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true });
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};
