const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const port = process.env.PORT || 3000;

require('./config/mongoose');
require('dotenv').config();

app.use('/v1', require('./controllers/events/index'));
app.use('/v1', require('./controllers/users/index'));


app.listen((port), () => {
  console.log(`Listening on port ${ port }`);
});

module.exports = app;
