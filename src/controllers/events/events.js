import * as Event from '../../model/eventModel';
import * as constants from '../../constants/constants';
/**
 * Create event
 * @param {*} req
 * @param {*} res
 */
export const createEvent = async (req, res) =>{
  try {
    const result = await Event.addEvent(req.body);
    res.status(200).json({[constants.AddEventSuccess]: result});
  } catch (e) {
    res.status(500).json({[constants.AddEventError]: e});
  }
};
