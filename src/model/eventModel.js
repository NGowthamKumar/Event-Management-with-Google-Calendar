import Event from '../schema/eventSchema';

/**
 * To add an event
 * @param {object} body
 * @return {promise}
 */
export const addEvent = (body) => {
  const event = new Event(body);
  return event.save();
};

/**
 * To update an event
 * @param {object} body
 * @return {promise}
 */
export const modifyEvent = (body) => {
  return Event.updateOne({_id: body._id}, {$set: body}, {runValidators: true});
};

/**
 * To show a single event details
 * @param {String} _id
 * @return {promise}
 */
export const eventDetails = (_id) => {
  return Event.findOne({_id});
};

/**
 * To list the events with pagination
 * @param {Number} limit
 * @param {Number} page
 * @return {promise}
 */
export const getEvent = (limit, page) => {
  return Event.paginate({}, {limit, page});
};

/**
 * To delete an event
 * @param {String} _id
 * @return {promise}
 */
export const removeEvent = (_id) => {
  return Event.deleteOne({_id});
};
