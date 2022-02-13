const koa = require('koa')
const koaRouter = require('koa-router')// importing Koa-Router
const bodyParser = require('koa-bodyparser');
const persons = require("./data/profile.js");

const app = new koa()
const router = new koaRouter()

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

router.get('person', '/person', (context) => {
  const query = context.query;
  const person = persons.find(e => e.id === query.id);
  context.body = {
    data: person
  }
})

router.get('friends', '/friends', (context) => {
  const query = context.query;
  const person = persons.find(e => e.id === query.id);
  const personsFriends = person.friends;

      const friends = persons.filter(e => {
        const isFriend = personsFriends.includes(+e.id);
        return isFriend;
      });

  context.body = {
    data: friends
  }
})

router.get('sticker', '/sticker', (context) => {
  const query = context.query;

  const friendsWithSameSticker = persons.filter(e => {
    const isSticker = e.stickers.includes(+query.sticker);
    return isSticker;
  });

  friendsWithSameSticker.unshift();

  context.body = {
    data: friendsWithSameSticker
  }
});

router.post('login', '/login', (context) => {
  if (context.request.body.name && context.request.body.password) {
    context.status = 200;
    context.body = {
      data: "someToken"
    }

    return;
  }

  context.status = 400;
})

router.get('buy', '/buy', (context) => {
  const query = context.query;

  const person = persons.find(e => e.id === query.id);
  person.stickers.push(+query.sticker[1]);
  person.donated = person.donated + (+query?.sum || 0);


  console.log(persons, person);

    context.status = 200;
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3030, () => console.log('Server running at PORT 3030'));