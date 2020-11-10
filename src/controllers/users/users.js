import * as User from '../../model/userModel';
import * as constants from '../../constants/constants';
/**
 *
 * @param {*} req
 * @param {*} res
 */
export const createUser = async (req, res) =>{
  try {
    const result = await User.add_user(req.body);
    res.status(200).json({[constants.AddUserSuccess]: result});
  } catch (e) {
    res.status(500).json({[constants.AddUserError]: e});
  }
};
