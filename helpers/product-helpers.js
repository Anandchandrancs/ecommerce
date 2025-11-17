var db = require('../config/connection')

module.exports = {
  addProduct: (product, callback) => {
    const database = db.get();
    if (!database) return callback(null);

    database.collection('product')
      .insertOne(product)
      .then((result) => {
        callback(result.insertedId);
      })
      .catch((err) => {
        console.error('insertOne error', err);
        callback(null);
      });
  }
}