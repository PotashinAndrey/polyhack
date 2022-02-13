const koa = require('koa')
const koaRouter = require('koa-router')// importing Koa-Router
const bodyParser = require('koa-bodyparser');
const { MongoClient } = require('mongodb');
const persons = require("./data/profile.js");
const context = require('koa/lib/context');

const app = new koa()
const router = new koaRouter()
const uri = "mongodb+srv://admin:admin@lambdaclaster.9epms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function mainDB() {
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
  }
}

mainDB();

function toGoodFormat(user) {
  const newUser = {
    ...user,
    id: user._id
  }
  return newUser;
}

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

router.get('person', '/person', async (context) => {
  const query = context.query;

  const database = client.db("polyhackDb");
  const usersColl = database.collection('polyhack');
  const user = await usersColl.findOne({}, { _id: query.id });

  const newUser = toGoodFormat(user);

  context.body = {
    data: newUser
  }
})

router.get('friends', '/friends', async (context) => {
  const query = context.query;

  const database = client.db("polyhackDb");
  const usersColl = database.collection('polyhack');
  const result = await usersColl.find({}, {s: 1}).toArray();

  const users = [...result].map(e => toGoodFormat(e));
  const user = users.find(e => +e.id === +query.id);
  const personsFriends = user.friends;

  const friends = users.filter(e => {
    const isFriend = personsFriends.includes(+e.id);
    return isFriend;
  })

  context.body = {
    data: friends
  }
})

router.get('sticker', '/sticker', async (context) => {
  const query = context.query;

  const database = client.db("polyhackDb");
  const usersColl = database.collection('polyhack');
  const result = await usersColl.find({}, {s: 1}).toArray();// костыль сраный

  const users = [...result].map(e => toGoodFormat(e));

  const friendsWithSameSticker = users.filter(e => {
    const isSticker = e.stickers.includes(+query.sticker);
    return isSticker;
  });

  friendsWithSameSticker.shift();

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

router.get('buy', '/buy', async (context) => {
  const query = context.query;

  const database = client.db("polyhackDb");
  const usersColl = database.collection('polyhack');
  const user = await usersColl.findOne({}, { _id: query.id });

  console.log(user);

  usersColl.updateOne({_id: query.id}, {$set: {stickers: [...user.stickers, (+query.sticker[1])], donated: user.donated + (+query?.sum || 0)}})

  user.stickers.push(+query.sticker[1]);
  person.donated = person.donated + (+query?.sum || 0);

  context.status = 200;
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3030, () => console.log('Server running at PORT 3030'));