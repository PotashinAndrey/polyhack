const koa = require('koa')
const koaRouter = require('koa-router')// importing Koa-Router
const bodyParser = require('koa-bodyparser');
const { MongoClient } = require('mongodb');
const persons = require("./data/profile.js");
const context = require('koa/lib/context');

const app = new koa()
const router = new koaRouter()
const uri = "mongodb+srv://admin:<password>@lambdaclaster.9epms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function mainDB() {
  try {
    await client.connect();

    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

// mainDB().catch(console.error);

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

// router.get('db', '/db', async (context) => {
//   await client.connect();
//   await listDatabases(client);

//   const database = client.db("polyhackDb");
//   const users = database.collection('polyhack');
//   const user = {
//     id: "1",
//     firstName: "Steven",
//     lastName: "Jobs",
//     avatar: "Steve_Jobs.jpg",
//     status: "Good guy",
//     donated: 56,
//     stickers: [2, 3, 4, 5],
//     count: 4,
//     friends: [2, 3, 4, 5, 6]
//   };
//   const res = await users.insertOne(user);
//   console.log(res);
// });

router.get('sticker', '/sticker', (context) => {
  const query = context.query;

  const friendsWithSameSticker = persons.filter(e => {
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