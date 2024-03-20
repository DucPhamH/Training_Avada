/* eslint-disable object-curly-spacing */
const Router = require("koa-router");
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteManyProducts,
  completeManyProducts,
  getOneProduct,
} = require("../handlers/productHandler");
const {
  productInputMiddleware,
  productUpdateMiddleware,
} = require("../middleware/productInputMiddleware");
const router = new Router({
  prefix: "/api",
});

router.get("/products", getProducts);
router.get("/products/:id", getOneProduct);
router.post("/products", productInputMiddleware, addProduct);
router.put("/products/:id", productUpdateMiddleware, updateProduct);
// router.delete("/products/:id", deleteOneProduct);
router.post("/products/many/deleteMany", deleteManyProducts);
router.post("/products/many/completeMany", completeManyProducts);
// router.post("/products/many/incompleteMany", incompleteManyProducts);

module.exports = router;
