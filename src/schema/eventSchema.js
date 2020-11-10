import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  event_name: {type: String, required: true},
  event_description: {type: String, required: true},
},
{versionKey: false},
);

module.exports = mongoose.model('Event', EventSchema);
