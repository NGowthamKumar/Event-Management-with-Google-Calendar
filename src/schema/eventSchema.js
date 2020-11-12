import mongoose from 'mongoose';
require('mongoose-type-email');
const mongoosePaginate = require('mongoose-paginate-v2');


const EventSchema = new mongoose.Schema({
  event_name: {type: String, required: true},
  event_description: {type: String, required: true},
  event_members: [{type: mongoose.SchemaTypes.Email, required: true}],
  event_duration: {type: Number, required: true},
  event_date: {type: Date, required: true},
},
{versionKey: false},
);
EventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Event', EventSchema);
