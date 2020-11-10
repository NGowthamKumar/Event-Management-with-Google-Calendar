import * as User from '../../model/userModel';

/**
 *
 * @param {*} req
 * @param {*} res
 */
export const createUser = async (req, res) =>{
  try {
    const result = await User.add_user(req.body);
    res.status(200).json({'user added': result});
  } catch (e) {
    res.status(500).json({'error in adding user': e});
  }
};
