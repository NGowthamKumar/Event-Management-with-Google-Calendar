import mongoose from 'mongoose';
require('mongoose-type-email');
const mongoosePaginate = require('mongoose-paginate-v2');


const EventSchema = new mongoose.Schema({
  GoogleEventId: {type: String},
  summary: {type: String, required: true},
  location: {type: String},
  description: {type: String, required: true},
  attendees: [{type: mongoose.SchemaTypes.Email, required: true}],
  event_duration: {type: Number},
  start: {dateTime: {type: String, required: true}, timeZone: {type: String, required: true}},
  end: {dateTime: {type: String, required: true}, timeZone: {type: String, required: true}},
},
{versionKey: false},
);
EventSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Event', EventSchema);
