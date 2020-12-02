import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  number: {type: Number, required: true},
  email: {type: mongoose.SchemaTypes.Email, required: true},
  type: {type: String, required: true},
  team: {type: String, required: true},
},
{versionKey: false},
);

module.exports = mongoose.model('User', UserSchema);
