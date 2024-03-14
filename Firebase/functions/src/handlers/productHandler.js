const { getAll, addOne } = require("../database/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
  try {
    const products = await getAll();
    return (ctx.body = {
      products,
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function addProduct(ctx) {
  try {
    const productData = ctx.request.body;
    const products = await addOne(productData);
    return (ctx.body = {
      products,
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message,
    };
  }
}
module.exports = {
  getProducts,
  addProduct,
};
