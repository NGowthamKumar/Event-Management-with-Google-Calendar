const mongoose = require('mongoose');
import {mongodbSuccess, mongodbError} from '../constants/constants';

mongoose.connect(process.env.MONGO_DB, process.env.MONGO_JSON, function(err) {
  if (err) console.log(mongodbError);
  else console.log(mongodbSuccess)
});
