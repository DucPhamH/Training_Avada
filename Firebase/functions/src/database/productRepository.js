const { db } = require("../service/addData");

/**
 *
 * @returns {[{name: string, price: number}, {name: string, price: number}, {name: string, price: number}, {name: string, price: number}]}
 */
async function getAll() {
  const products = [];
  const snapshot = await db.collection("Product").get();
  // console.log(snapshot);
  snapshot.forEach((doc) => {
    products.push(doc.data());
  });
  // console.log(products);
  return products;
}

/**
 *
 * @returns {{name: string, price: number}}
 */
async function addOne(data) {
  const product = await db.collection("Product").add(data);
  return product;
}

module.exports = {
  getAll,
  addOne,
};
