import * as Event from '../../model/eventModel';
import * as constants from '../../constants/constants';

/**
 * Create event
 * @param {*} req
 * @param {*} res
 */
export const createEvent = async (req, res) =>{
  try {
    const result = await Event.add_event(req.body);
    res.status(200).json({[constants.Add_event_success]: result});
  } catch (e) {
    res.status(500).json({[constants.Add_event_error]: e});
  }
};
