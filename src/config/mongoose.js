const mongoose = require('mongoose');

import {mongodbSuccess, mongodbError} from '../constants/constants';


mongoose.connect(process.env.MONGO_DB, {'useUnifiedTopology': true, 'useNewUrlParser': true});

const db = mongoose.connection;

db.on('error', ()=>{
  console.error(mongodbError);
});
db.once('open', function() {
  console.log(mongodbSuccess);
});

