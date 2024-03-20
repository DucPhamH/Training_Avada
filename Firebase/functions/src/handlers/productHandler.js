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
 * @returns {Promise<{data: {name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}}|{success: boolean, error: *}|{message: string, status: string}>}
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
 * @returns {Promise<{data: {name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}}|{success: boolean, error: *}|{message: string, status: string}>}
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
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function updateProduct(ctx) {
  try {
    const { id } = ctx.params;
    const productData = ctx.request.body;
    const res = await updateOne({ id, data: productData });
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

// /**
//  *
//  * @param ctx
//  * @returns {Promise<{data: {name: string, price: number, isCompelete: boolean, createAt: Date, updateAt: Date}}|{success: boolean, error: *}|{message: string, status: string}>}
//  */
// async function deleteOneProduct(ctx) {
//   try {
//     const { id } = ctx.params;
//     const products = await removeOne(id);
//     if (products) {
//       return (ctx.body = {
//         data: products,
//       });
//     }
//     throw new Error("Product Not Found with that id!");
//   } catch (e) {
//     ctx.status = 404;
//     ctx.body = {
//       success: false,
//       data: [],
//       error: e.message,
//     };
//   }
// }

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
    //  VD data gửi có dạng {
    //         arrayID : [1,2,3,4],
    //         isCompelete: true
    //   }
    const { arrayID, isCompelete } = ctx.request.body;
    const res = await completeMany(arrayID, isCompelete);
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

// /**
//  *
//  * @param ctx
//  * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
//  */
// async function incompleteManyProducts(ctx) {
//   try {
//     const { data } = ctx.request.body;
//     const res = await incompleteMany(data);
//     ctx.status = 201;
//     return (ctx.body = {
//       success: res,
//     });
//   } catch (e) {
//     ctx.status = 404;
//     ctx.body = {
//       success: false,
//       data: [],
//       error: e.message,
//     };
//   }
// }
module.exports = {
  getProducts,
  getOneProduct,
  addProduct,
  updateProduct,
  deleteManyProducts,
  completeManyProducts,
};
