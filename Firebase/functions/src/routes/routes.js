/* eslint-disable object-curly-spacing */
const Router = require("koa-router");
const { getProducts, addProduct } = require("../handlers/productHandler");
const router = new Router({
  prefix: "/api",
});

router.get("/products", getProducts);
router.post("/products", addProduct);

module.exports = router;
