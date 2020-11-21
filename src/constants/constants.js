const statusSuccess = 200;
const statusError = 500;
const clientError = 400;
const idError = 'Event id required';
const ReadEventError = 'Can\'t get the event details';
const ReadEventSuccess = 'got the event details';

const mongodbSuccess = 'Connected to MongoDB...';
const mongodbError = 'Can\'t connect MongoDB';
const AddEventError = 'Error in adding events';
const AddEventSuccess = 'Event_added';
const AddUserSuccess = 'New User added';
const AddUserError = 'Can\'t add User';
const UpdateEventSuccess = 'Event updated';
const UpdateEventError = 'Can\'t update Event';
const GetEventsSuccess = 'Got the event list';
const GetEventsError = 'Can\'t get the Events';
const DeleteEventSuccess = 'Event deleted';
const DeleteEventError = 'Can\'t delete Event';
const emailValidate = new RegExp('[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)');
const TOKEN_PATH = `${__dirname}/token.json`;
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

module.exports = {SCOPES, TOKEN_PATH, idError, ReadEventError, ReadEventSuccess, clientError, emailValidate, statusSuccess, statusError, mongodbSuccess, mongodbError, AddEventError, AddEventSuccess, AddUserSuccess, AddUserError, UpdateEventSuccess, UpdateEventError, GetEventsSuccess, GetEventsError, DeleteEventSuccess, DeleteEventError};
