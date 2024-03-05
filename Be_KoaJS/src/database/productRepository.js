const fs = require("fs");
const { data: products } = require("./products.json");

/**
 *
 * @returns {[{name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}, {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}, {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}, {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}]}
 */
function getAll() {
  //   console.log(products);
  return products;
}

/**
 *
 * @param id
 * @returns {{name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string} | {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string} | {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string} | {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}}
 */
function getOne(id) {
  return products.find((product) => product.id === parseInt(id));
}

/**
 *
 * @param data
 */
function add(data) {
  const updatedProducts = [data, ...products];
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updatedProducts,
    })
  );
}

/**
 *
 * @param id
 *
 */
function remove(id) {
  const updatedProducts = products.filter(
    (product) => parseInt(product.id) !== parseInt(id)
  );

  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updatedProducts,
    })
  );
}

/**
 * @param id
 * @param data
 */
function update(id, data) {
  const updatedProducts = products.map((product) => {
    if (product.id === parseInt(id)) {
      return { ...product, ...data };
    }
    return product;
  });
  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updatedProducts,
    })
  );
}
module.exports = {
  getOne,
  getAll,
  add,
  remove,
  update,
};
