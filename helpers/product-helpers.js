var db = require('../config/connection')
var collection = require('../config/collections')

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
  },
  getAllProducts:()=>{
    return new Promise(async(resolve, reject)=>{
        let products=await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
        resolve(products)
    })
  }
}