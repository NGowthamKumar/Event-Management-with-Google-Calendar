const express = require('express');
const {initDatabase} = require('./config/mongoose');
require('dotenv').config();
initDatabase();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/event', require('./controllers/events/index'));
app.use('/user', require('./controllers/users/index'));


app.listen((port), () => {
  console.log(`Listening on port ${ port }`);
});

module.exports = app;
