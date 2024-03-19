const Koa = require("koa");
const { koaBody } = require("koa-body");
const routes = require("../routes/routes.js");
const bodyParser = require("koa-bodyparser");

function hybridBodyParser(opts) {
  const bp = bodyParser(opts);
  return async (ctx, next) => {
    ctx.request.body = ctx.request.body || ctx.req.body;
    return bp(ctx, next);
  };
}
const app = new Koa();

app.use(hybridBodyParser());
// app.use(koaBody());
app.use(routes.routes());
app.use(routes.allowedMethods());
app.listen(5000);
module.exports = app;
