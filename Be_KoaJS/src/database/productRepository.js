const fs = require("fs");
const { data: products } = require("./products.json");

/**
 *
 * @returns {[{name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}, {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}, {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}, {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}]}
 */
function getAll(limit, sort, fields) {
  //   console.log(products)
  if (!limit) {
    limit = 10;
  }
  if (!sort) {
    sort = "asc";
  }
  console.log(limit, sort);
  if (sort === "asc") {
    products.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  } else if (sort === "desc") {
    products.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
  // const newProducts =  newProduct.length > 0  ? newProduct.flat().slice(0, limit): products.slice(0, limit);
  const newProductsLimit = products.slice(0, limit);
  const newProducts = [];
  if (fields) {
    const fieldsArray = fields.split(",");
    const newProductfields = newProductsLimit.map((product) => {
      const newProduct = {};
      fieldsArray.forEach((field) => {
        newProduct[field] = product[field];
      });
      return newProduct;
    });
    newProducts.push(newProductfields);
  }
  return newProducts.length > 0 ? newProducts.flat() : newProductsLimit;
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

function removeMany(objID) {
  // arrrayID thuoc dang { selectedItems: [ 2, 1 ] }
  const updatedProducts = products.filter(
    (product) => !objID.selectedItems.includes(parseInt(product.id))
  );

  return fs.writeFileSync(
    "./src/database/products.json",
    JSON.stringify({
      data: updatedProducts,
    })
  );
}

function completeMany(objID) {
  // arrrayID thuoc dang { selectedItems: [ 2, 1 ] }
  const updatedProducts = products.map((product) => {
    if (objID.selectedItems.includes(parseInt(product.id))) {
      return { ...product, isDone: true };
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

function incompleteMany(objID) {
  // arrrayID thuoc dang { selectedItems: [ 2, 1 ] }
  const updatedProducts = products.map((product) => {
    if (objID.selectedItems.includes(parseInt(product.id))) {
      return { ...product, isDone: false };
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
  removeMany,
  completeMany,
  incompleteMany,
};
