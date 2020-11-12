import * as Event from '../../model/eventModel';
import * as constants from '../../constants/constants';
const ObjectId = require('mongoose').Types.ObjectId;
// import {sendMail} from '../../services/mail';

/**
 * To Create a single event
 * @param {*} req
 * @param {*} res
 */
export const createEvent = async (req, res) =>{
  try {
    /* req.body.event_members.forEach((email) => {
      if (!constants.emailValidate.test(email)) {
        throw {
      }
    }); */
    const result = await Event.addEvent(req.body);
    // sendMail(req.body.event_members);
    res.status(constants.statusSuccess).json({[constants.AddEventSuccess]: result});
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
    if (!((req.body.hasOwnProperty('_id')) && (ObjectId.isValid(req.body._id)))) {
      throw new Error(constants.idError);
    }
    const result = await Event.modifyEvent(req.body);
    res.status(constants.statusSuccess).json({[constants.UpdateEventSuccess]: result});
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
    const result = await Event.removeEvent(req.params._id);
    res.status(constants.statusSuccess).json({[constants.DeleteEventSuccess]: result});
  } catch (e) {
    res.status(constants.statusError).json({[constants.DeleteEventError]: e});
  }
};
