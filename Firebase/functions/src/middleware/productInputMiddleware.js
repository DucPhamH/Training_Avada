const yup = require("yup");

async function productInputMiddleware(ctx, next) {
  try {
    const productData = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string().required(),
      price: yup.number().required(),
    });

    await schema.validate(productData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

async function productUpdateMiddleware(ctx, next) {
  try {
    const productData = ctx.request.body;
    let schema = yup.object().shape({
      name: yup.string(),
      price: yup.number(),
      is_done: yup.boolean(),
    });

    await schema.validate(productData);
    next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name,
    };
  }
}

module.exports = { productInputMiddleware, productUpdateMiddleware };
