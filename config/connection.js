const { MongoClient } = require('mongodb');

const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'ecommerce';

let _db = null;
let _client = null;

module.exports = {
  connect: async (callback) => {
    try {
      _client = new MongoClient(mongoURL);
      await _client.connect();
      _db = _client.db(dbName);
      console.log('MongoDB connected');
      callback(null);
    } catch (err) {
      console.error('MongoDB connect error:', err);
      callback(err);
    }
  },

  get: () => _db,

  close: async () => {
    if (_client) await _client.close();
    _db = null;
    _client = null;
  }
};