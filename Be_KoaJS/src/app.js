const Koa = require("koa");
const { koaBody } = require("koa-body");
const routes = require("./routes/routes.js");
const render = require("koa-ejs");
const path = require("path");
const app = new Koa();
const cors = require("@koa/cors");

render(app, {
  root: path.join(__dirname, "view"),
  layout: "template",
  viewExt: "html",
  cache: false,
  debug: true,
});
app.use(cors());
app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());

app.listen(5000);
