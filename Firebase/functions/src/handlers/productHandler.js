const {
  getAll,
  addOne,
  updateOne,
  removeOne,
  deleteMany,
  completeMany,
  incompleteMany,
  getOne,
} = require("../database/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
  try {
    const { limit, sort, fields } = ctx.query;
    const products = await getAll({ limit, sort, fields });
    return (ctx.body = {
      data: products,
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
 * @returns {Promise<{data: {name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getOneProduct(ctx) {
  try {
    const { id } = ctx.params;
    const products = await getOne(id);
    if (products) {
      return (ctx.body = {
        data: products,
      });
    }
    throw new Error("Product Not Found with that id!");
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
 * @returns {Promise<{data: {name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function addProduct(ctx) {
  try {
    const productData = ctx.request.body;
    console.log(productData);
    const products = await addOne(productData);
    return (ctx.body = {
      data: products,
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
 * @returns {Promise<{data: {name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function updateProduct(ctx) {
  try {
    const { id } = ctx.params;
    const productData = ctx.request.body;
    const products = await updateOne({ id, data: productData });
    return (ctx.body = {
      data: products,
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
 * @returns {Promise<{data: {name: string, price: number, is_done: boolean, create_At: Date, update_At: Date}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function deleteOneProduct(ctx) {
  try {
    const { id } = ctx.params;
    const products = await removeOne(id);
    if (products) {
      return (ctx.body = {
        data: products,
      });
    }
    throw new Error("Product Not Found with that id!");
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
async function deleteManyProducts(ctx) {
  try {
    const { data } = ctx.request.body;
    const res = await deleteMany(data);
    ctx.status = 201;
    return (ctx.body = {
      success: res,
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
async function completeManyProducts(ctx) {
  try {
    const { data } = ctx.request.body;
    const res = await completeMany(data);
    ctx.status = 201;
    return (ctx.body = {
      success: res,
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
async function incompleteManyProducts(ctx) {
  try {
    const { data } = ctx.request.body;
    const res = await incompleteMany(data);
    ctx.status = 201;
    return (ctx.body = {
      success: res,
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
  getOneProduct,
  addProduct,
  updateProduct,
  deleteOneProduct,
  deleteManyProducts,
  completeManyProducts,
  incompleteManyProducts,
};
