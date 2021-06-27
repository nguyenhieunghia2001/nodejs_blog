require('dotenv').config()
const express = require('express')
const handlebars = require('express-handlebars');
const app = express()
const port = 8888
const path = require('path');
const authMiddleware = require('./middlewares/auth')
const cookieSession = require('express-session')
const route = require('./routes');
const db = require('./config/database')
const cookieParser = require('cookie-parser')
const {
  mongooseToObject,
  mutipleMongooseToObject,
} = require("./util/mongoos");
const { InitPassport } = require('./config/service/passport');
InitPassport(app);

const handlebars_hp = require('handlebars');
const helpers = require('handlebars-helpers')({
  handlebars: handlebars_hp
});

//connect db
db.connect();

app.use(cookieSession({
  name: 'session',
  keys: ['screct'],
  secret: 'somevalue',
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use(authMiddleware);

//cookie parser
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));
console.log(__dirname);
app.use(express.urlencoded({
  extended: true
}));

app.use(express.json());

var hbs = handlebars.create({
  defaultLayout: 'main',
  helpers: {
    if_equal: (a, b, opts) => a == b ? opts.fn(this) : opts.inverse(this),
    sum: (value) => value + 1,
    contain: (elem, list, options) => {
      if(list){
        let count = 0;
        const arr = Object.values(list);
        arr.forEach(e => {
          if(e.email == elem){
            count ++ ;
          }
        })

        if (count > 0) {
          return options.fn(this);
        }
        else{
          return options.inverse(this);
        }
      }
      else return options.inverse(this);
    },
    countObject: (list) => Object.keys(list).length
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource', 'views'));
//route init
route(app);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})