import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  user_name: {type: String, required: true},
  user_location: {type: String, required: true},
},
{versionKey: false},
);

module.exports = mongoose.model('User', UserSchema);
