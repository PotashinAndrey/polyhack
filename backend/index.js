const koa = require('koa')
const koaRouter = require('koa-router')// importing Koa-Router
const bodyParser = require('koa-bodyparser');

const app = new koa()
const router = new koaRouter()

const staticData = [{
  id: 1,
  reg: new Date().getTime(),
  lastIn: new Date().getTime()
}, {
  id: 2,
  reg: new Date().getTime(),
  lastIn: new Date().getTime()
}];

app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next()
  } catch (err) {
    console.log(err.status)
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
})

router.get('home', '/', (context) => {
  context.body = "Welcome to my Koa.js Server"
})

router.get('data', '/data', (context) => {
  context.body = {
    data: staticData
  };
})

router.post('save', '/save', (context) => {
  context.status = 200;
  context.body = { data: 1 }

  console.log(context.request.body);
  staticData.push(...context.request.body.data);

  console.log(staticData);
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3030, () => console.log('Server running at PORT 3030'));