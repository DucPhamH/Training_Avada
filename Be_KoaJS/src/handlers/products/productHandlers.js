const {
  getAll: getAllProducts,
  getOne: getOneProduct,
  add: addProduct,
  update: updateProduct,
  remove: removeProduct,
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
    // console.log(limit, sort);
    const products = getAllProducts();
    if (!limit) {
      limit = 10;
    }
    if (!sort) {
      sort = "asc";
    }
    console.log(limit, sort);
    //sort theo thời gian createdAt
    if (sort === "asc") {
      products.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    } else {
      products.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
    //lấy ra các field cần lấy
    const newProduct = [];
    if (fields) {
      const fieldsArray = fields.split(",");
      const newProductfields = products.map((product) => {
        const newProduct = {};
        fieldsArray.forEach((field) => {
          newProduct[field] = product[field];
        });
        return newProduct;
      });
      newProduct.push(newProductfields);
    }
    console.log(newProduct);
    //limit số lượng sản phẩm
    const newProducts =
      newProduct.length > 0
        ? newProduct.flat().slice(0, limit)
        : products.slice(0, limit);

    await ctx.render("product", { newProducts });
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
    const newPostData = { ...postData, createdAt: new Date().toISOString() };
    addProduct(newPostData);

    ctx.status = 201;
    return (ctx.body = {
      success: true,
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
    updateProduct(id, newPostData);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
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
    removeProduct(id);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
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
};
