const mongoose = require('mongoose');
import { Mongodb_success, Mongodb_error } from '../constants/constants';

mongoose.connect(process.env.MONGO_DB,process.env.MONGO_JSON ,function(err){
    if(err) console.log(Mongodb_error);
   else console.log(Mongodb_success);
}); 