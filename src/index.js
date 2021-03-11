const e = require('express');
const express = require('express')
const handlebars  = require('express-handlebars');
const app = express()
const port = 8888
const path = require('path');
const route = require('./routes');
const db = require('./config/database')

//connect db
db.connect();


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource', 'views'));



//route init
route(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})