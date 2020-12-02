import * as Event from '../../model/eventModel';
import * as User from '../../model/userModel';
import * as constants from '../../constants/constants';
import {Response} from '../../middllewares/responseMiddleware';
import {validateId} from '../../helpers/validateObjectid';
const ObjectId = require('mongoose').Types.ObjectId;
import {GoogleCalendar} from '../../services/googleCalendar.service';
import {logger} from '../../config/logger';
// import {sendMail} from '../../services/mail';


/**
 * To authorize the user
 * @param {*} req
 * @param {*} res
 */
export const authorization = async (req, res)=>{
  try {
    const obj = new GoogleCalendar();
    let concentUrl = await obj.authorize();
    if (concentUrl === 'A_GEN') {
      concentUrl = '/event/authSuccess';
    }
    res.redirect(concentUrl);
  } catch (e) {
    Response(res, constants.serverError, 'Login Failed');
  }
};


/**
 * To Create a single event
 * @param {*} req
 * @param {*} res
 */
export const createEvent = async (req, res) =>{
  try {
    const user = await User.userDetail(req.body.emailId);
    if (user.type == 'TeamLead/Manager') {
      const obj = new GoogleCalendar();
      const createResponse = await obj.CreateGoogleEvent(req.body);
      req.body.GoogleEventId = createResponse.data.id;
      await Event.addEvent(req.body);
      // const date = (req.body.start.dateTime).split('T', 1);
      // sendMail(req.body.attendees, `${req.body.summary}`, `${date[0]}`);
      logger.info('Event registered successfully');
      Response(res, constants.statusSuccess, constants.AddEventSuccess);
    } else {
      logger.warn('Teammates can\'t create an event.');
      Response(res, constants.clientError, constants.permissionError);
    }
  } catch (e) {
    logger.error('Error while registering Event');
    Response(res, constants.serverError, constants.AddEventError);
  }
};


/**
 * To update an event
 * @param {*} req
 * @param {*} res
 */
export const updateEvent = async (req, res) => {
  try {
    if (! ((req.body.hasOwnProperty('_id')) && (ObjectId.isValid(req.body._id))) ) {
      Response(res, constants.clientError, constants.idError);
      return;
    }
    const EventMongodbId = req.body._id;
    const event = await Event.eventDetails(EventMongodbId);
    req.body.GoogleEventId = event.GoogleEventId;
    const obj = new GoogleCalendar();
    const createResponse = await obj.updateEvent(req.body);
    createResponse.data._id = EventMongodbId;
    await Event.modifyEvent(createResponse.data);
    logger.info('Event updated successfully');
    Response(res, constants.statusSuccess, constants.UpdateEventSuccess);
  } catch (e) {
    logger.error('Error while updating an event');
    Response(res, constants.serverError, constants.UpdateEventError);
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
      Response(res, constants.clientError, constants.idError);
      return;
    }
    const result = await Event.eventDetails(req.params._id);
    logger.info('Got the event details successfully');
    Response(res, constants.statusSuccess, result);
  } catch (e) {
    logger.error('Error while getting he event details');
    Response(res, constants.serverError, constants.ReadEventError);
  }
};

/**
 * To list all the events
 * @param {*} req
 * @param {*} res
 */
export const getEvents = async (req, res) => {
  try {
    await Event.getEvent(req.query.limit || 5, req.query.page || 1);
    /* const obj = new GoogleCalendar();
    obj.listEvents();*/
    logger.info('Got the event list successfully');
    Response(res, constants.statusSuccess, constants.GetEventsSuccess);
  } catch (e) {
    logger.error('Error while getting the event list');
    Response(res, constants.serverError, constants.GetEventsError);
  }
};

/**
 * To delete a single event
 * @param {*} req
 * @param {*} res
 */
export const deleteEvent = async (req, res) => {
  try {
    if (validateId(req.params._id)) {
      const EventMongodbId = req.params._id;
      const event = await Event.eventDetails(EventMongodbId);
      const obj = new GoogleCalendar();
      await obj.deleteEvent(event.GoogleEventId);
      await Event.removeEvent(EventMongodbId);
      logger.info('Event deteted successfully');
      Response(res, constants.statusSuccess, constants.DeleteEventSuccess);
    } else {
      logger.warn('Mongodb Object id is not valid');
      Response(res, constants.clientError, constants.ObjectIdError);
    }
  } catch (e) {
    logger.error('can\'t delete event error');
    Response(res, constants.serverError, constants.DeleteEventError);
  }
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
  }
  res.status(constants.statusSuccess).json({
    message: 'Login successful',
  });
};
