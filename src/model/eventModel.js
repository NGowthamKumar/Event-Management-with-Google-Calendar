import Event from '../schema/eventSchema';

/**
 *
 * @param {object} body
 * @return {*}
 */
export const addEvent = (body) => {
  const event = new Event(body);
  return event.save();
};
