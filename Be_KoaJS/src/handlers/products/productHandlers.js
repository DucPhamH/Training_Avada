const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  add: addProduct,
  update: updateProduct,
  remove: removeProduct,
  removeMany: removeManyProduct,
  completeMany: completeManyProduct,
  incompleteMany: incompleteManyProduct,
} = require("../../database/productRepository");

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getProducts(ctx) {
  try {
    let limit = ctx.query.limit;
    let sort = ctx.query.sort;
    let fields = ctx.query.fields;

    const products = getAllProducts(limit, sort, fields);
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
 * @returns {Promise<{data: {name: string, price: number, description: string, product: string, color: string, createdAt: string, image: string}}|{success: boolean, error: *}|{message: string, status: string}>}
 */
async function getProduct(ctx) {
  try {
    const { id } = ctx.params;
    const getCurrentProduct = getOneProduct(id);
    if (getCurrentProduct) {
      return (ctx.body = {
        data: getCurrentProduct,
      });
    }

    throw new Error("Product Not Found with that id!");
  } catch (e) {
    ctx.status = 404;
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function save(ctx) {
  try {
    const postData = ctx.request.body;
    const newPostData = {
      ...postData,
      id: parseInt(new Date().getTime() / 1000),
      isDone: false,
      createdAt: new Date().toISOString(),
    };
    const newPostDatas = addProduct(newPostData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
      data: newPostDatas,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function updateOne(ctx) {
  try {
    const { id } = ctx.params;
    const postData = ctx.request.body;
    const newPostData = { ...postData, createdAt: new Date().toISOString() };
    const newProducts = updateProduct(id, newPostData);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: newProducts,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */

async function removeOne(ctx) {
  try {
    const { id } = ctx.params;
    const newProducts = removeProduct(id);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: newProducts,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function removeMany(ctx) {
  try {
    const objID = ctx.request.body;
    console.log(objID);
    const newProducts = removeManyProduct(objID);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: newProducts,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function completeMany(ctx) {
  try {
    const objID = ctx.request.body;
    const newProducts = completeManyProduct(objID);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: newProducts,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

async function incompleteMany(ctx) {
  try {
    const objID = ctx.request.body;
    const newProducts = incompleteManyProduct(objID);
    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: newProducts,
    });
  } catch (e) {
    return (ctx.body = {
      success: false,
      error: e.message,
    });
  }
}

module.exports = {
  getProducts,
  getProduct,
  save,
  updateOne,
  removeOne,
  removeMany,
  completeMany,
  incompleteMany,
};
