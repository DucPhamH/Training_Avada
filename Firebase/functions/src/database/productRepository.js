const { db } = require("../service/addData");
const { FieldValue } = require("@google-cloud/firestore");

/**
 *
 * @returns {[{name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}, {name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}, {name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}, {name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}]}
 */
async function getAll({ limit, sort, fields }) {
  const products = [];
  const newProducts = [];
  if (!limit) {
    limit = 10;
  }
  if (!sort) {
    sort = "asc";
  }
  console.log(limit, sort);
  const snapshot = await db
    .collection("Product")
    .orderBy("created_At", sort)
    .limit(parseInt(limit))
    .get();
  snapshot.forEach((doc) => {
    products.push(doc.data());
  });
  if (fields) {
    const fieldsArray = fields.split(",");
    const newProductfields = products.map((product) => {
      const newProduct = {};
      fieldsArray.forEach((field) => {
        newProduct[field] = product[field];
      });
      return newProduct;
    });
    newProducts.push(newProductfields);
  }
  return newProducts.length > 0 ? newProducts.flat() : products;
}

/**
 *
 * @returns {{name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}}
 */
async function getOne(id) {
  const product = await db.collection("Product").doc(id).get();
  return product.data();
}

/**
 *
 * @returns {{name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}}
 */
async function addOne(data) {
  const product = await db.collection("Product").add({
    ...data,
    created_At: FieldValue.serverTimestamp(),
    updated_At: FieldValue.serverTimestamp(),
  });
  const productData = await product.get();
  return productData.data();
}

/**
 *
 * @returns {{name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}}
 */
async function updateOne({ id, data }) {
  const product = await db
    .collection("Product")
    .doc(id)
    .update({
      ...data,
      updated_At: FieldValue.serverTimestamp(),
    });
  const productData = await product.get();
  return productData.data();
}

/**
 *
 * @returns {{name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}}
 */
async function removeOne(id) {
  const findProduct = await db.collection("Product").doc(id).get();
  if (!findProduct.exists) {
    return null;
  }
  const product = await db.collection("Product").doc(id).delete();
  return product;
}

/**
 *
 * @returns {boolean}
 */
async function deleteMany(data) {
  // data dạng là mảng các id vd [1,2,3,4]
  data.forEach(async (id) => {
    await db.collection("Product").doc(id).delete();
  });
  return true;
}

/**
 *
 * @returns {boolean}
 */
async function completeMany(data) {
  // data dạng là mảng các id vd [1,2,3,4]
  data.forEach(async (id) => {
    await db.collection("Product").doc(id).update({
      is_done: true,
    });
  });
  return true;
}

/**
 *
 * @returns {boolean}
 */
async function incompleteMany(data) {
  // data dạng là mảng các id vd [1,2,3,4]
  data.forEach(async (id) => {
    await db.collection("Product").doc(id).update({
      is_done: false,
    });
  });
  return true;
}

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  removeOne,
  deleteMany,
  completeMany,
  incompleteMany,
};
