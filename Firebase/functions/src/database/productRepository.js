const { fieldsQuery } = require("../helpers/fieldsQuery");
const { db } = require("../service/addData");
const { FieldValue } = require("@google-cloud/firestore");

/**
 *
 * @returns {[{name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}, {name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}, {name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}, {name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}]}
 */
async function getAll({ limit, sort, fields }) {
  const products = [];
  if (!limit) {
    limit = 10;
  }
  if (!sort) {
    sort = "asc";
  }
  const snapshot = await db
    .collection("Product")
    .orderBy("createdAt", sort)
    .limit(parseInt(limit))
    .get();
  snapshot.forEach((doc) => {
    products.push(doc.data());
  });
  // const newProducts = [];
  // if (fields) {
  //   const fieldsArray = fields.split(",");
  //   const newProductfields = products.map((product) => {
  //     const newProduct = {};
  //     fieldsArray.forEach((field) => {
  //       newProduct[field] = product[field];
  //     });
  //     return newProduct;
  //   });
  //   newProducts.push(newProductfields);
  // }
  const newProducts = fieldsQuery(fields, products);
  return newProducts.length > 0 ? newProducts.flat() : products;
}

/**
 *
 * @returns {{name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}}
 */
async function getOne(id) {
  const product = await db.collection("Product").doc(id).get();
  return product.data();
}

/**
 *
 * @returns {{name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}}
 */
async function addOne(data) {
  const createAt = new Date();
  const updateAt = new Date();
  await db.collection("Product").add({
    ...data,
    createAt,
    updateAt,
  });
  const productData = {
    ...data,
    createAt,
    updateAt,
  };
  return productData;
}

/**
 *
 * @returns {boolean}
 */
async function updateOne({ id, data }) {
  const product = await db
    .collection("Product")
    .doc(id)
    .update({
      ...data,
      updatedAt: new Date(),
    });
  return true;
}

// /**
//  *
//  * @returns {{name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}}
//  */
// async function removeOne(id) {
//   const findProduct = await db.collection("Product").doc(id).get();
//   if (!findProduct.exists) {
//     return null;
//   }
//   const product = await db.collection("Product").doc(id).delete();
//   return product;
// }

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
async function completeMany(arrayID, isCompelete) {
  // data dạng là mảng các id vd [1,2,3,4]
  // data.forEach(async (id) => {
  //   await db.collection("Product").doc(id).update({
  //     isCompelete: true,
  //     updateAt: FieldValue.serverTimestamp(),
  //   });
  // });
  Promise.all(
    arrayID.map(async (id) => {
      await db.collection("Product").doc(id).update({
        isCompelete: isCompelete,
        updateAt: new Date(),
      });
    })
  );
  return true;
}

// /**
//  *
//  * @returns {boolean}
//  */
// async function incompleteMany(data) {
//   // data dạng là mảng các id vd [1,2,3,4]
//   data.forEach(async (id) => {
//     await db.collection("Product").doc(id).update({
//       isCompelete: false,
//       updateAt: FieldValue.serverTimestamp(),
//     });
//   });
//   return true;
// }

module.exports = {
  getAll,
  getOne,
  addOne,
  updateOne,
  deleteMany,
  completeMany,
};
