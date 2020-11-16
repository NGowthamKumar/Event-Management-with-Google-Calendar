import mongoose from 'mongoose';
import {getConnectionUri} from '../config/db.config';
import {mongodbSuccess, mongodbError} from '../constants/constants';

/**
 * default function for intialising database connection
 * @async
 * @return{Promise}
 */
export const initDatabase = async () => {
  const connectionUri = await getConnectionUri();
  const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Config for returning updated document
  mongoose.set('returnOriginal', false);

  //  Connecting to database
  mongoose.connect(connectionUri, connectionOptions);
  // mongoose.set('debug', true);
  //  handling errors and connections
  const db = mongoose.connection;
  db.on('error', (err) => {
    console.log(mongodbError + err);
  } );
  db.once('open', () => {
    console.log(mongodbSuccess);
  } );
  return db;
};
