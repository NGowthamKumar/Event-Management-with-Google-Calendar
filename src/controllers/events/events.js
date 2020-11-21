import * as Event from '../../model/eventModel';
import * as constants from '../../constants/constants';
// import {googleEvent} from '../../helpers/eventFormat';
const ObjectId = require('mongoose').Types.ObjectId;
// const {google} = require('googleapis');
// const calendar = google.calendar({version: 'v3', auth});
// import {sendMail} from '../../services/mail';
import {GoogleCalendar} from '../../services/googleCalendar.service';

/**
 * To Create a single event
 * @param {*} req
 * @param {*} res
 */
export const createEvent = async (req, res) =>{
  try {
    const obj = new GoogleCalendar();
    const createResponse = await obj.CreateGoogleEvent(req.body);
    req.body.GoogleEventId = createResponse.data.id;
    await Event.addEvent(req.body);
    // sendMail(req.body.event_members);
    res.status(constants.statusSuccess).json({[constants.AddEventSuccess]: createResponse});
  } catch (e) {
    res.status(constants.statusError).json({[constants.AddEventError]: e});
  }
};


/**
 * To update an event
 * @param {*} req
 * @param {*} res
 */
export const updateEvent = async (req, res) => {
  try {
    const EventMongodbId = req.body._id;
    const event = await Event.eventDetails(EventMongodbId);
    req.body.GoogleEventId = event.GoogleEventId;
    const obj = new GoogleCalendar();
    const createResponse = await obj.updateEvent(req.body);
    createResponse.data._id = EventMongodbId;
    await Event.modifyEvent(createResponse.data);
    res.status(constants.statusSuccess).json({[constants.UpdateEventSuccess]: createResponse});
  } catch (e) {
    res.status(constants.statusError).json({[constants.UpdateEventError]: e});
  }
};

/**
 * To get a single event details
 * @param {*} req
 * @param {*} res
 */
export const readEvent = async (req, res) =>{
  try {
    if (!((req.params.hasOwnProperty('_id')) && (ObjectId.isValid(req.params._id)))) {
      throw new Error(constants.idError);
    }
    const result = await Event.eventDetails(req.params._id);
    res.status(constants.statusSuccess).json({[constants.ReadEventSuccess]: result});
  } catch (e) {
    res.status(constants.statusError).json({[constants.ReadEventError]: e});
  }
};

/**
 * To list all the events
 * @param {*} req
 * @param {*} res
 */
export const getEvents = async (req, res) => {
  try {
    const result = await Event.getEvent(req.query.limit || 5, req.query.page || 1);
    res.status(constants.statusSuccess).json({[constants.GetEventsSuccess]: result});
  } catch (e) {
    res.status(constants.statusError).json({[constants.GetEventsError]: e});
  }
};

/**
 * To delete a single event
 * @param {*} req
 * @param {*} res
 */
export const deleteEvent = async (req, res) => {
  try {
    const EventMongodbId = req.params._id;
    const event = await Event.eventDetails(EventMongodbId);
    const obj = new GoogleCalendar();
    const deleteResponse = await obj.deleteEvent(event.GoogleEventId);
    await Event.removeEvent(EventMongodbId);
    res.status(constants.statusSuccess).json({[constants.DeleteEventSuccess]: deleteResponse});
  } catch (e) {
    res.status(constants.statusError).json({[constants.DeleteEventError]: e});
  }
};

/**
 * For testing
 * @param {*} req
 * @param {*} res
 */
export const test = async (req, res) => {
  const obj = new GoogleCalendar();
  let concentUrl = await obj.authorize();
  if (concentUrl === 'A_GEN') {
    concentUrl = '/v1/authSuccess';
  }
  res.redirect(concentUrl);
  // response.end();
  // res.json({message: 'done'});
};

/**
 * auth success google callback
 *
 * @param {*} req
 * @param {*} res
 */
export const authSuccessGoogle = async (req, res)=>{
  const obj = new GoogleCalendar();
  if (req?.query?.code) {
    await obj.createAuth(req.query.code);
    console.log(req.query);
  }
  obj.listEvents();
  res.status(constants.statusSuccess).json({
    messaege: 'done',
  });
};
