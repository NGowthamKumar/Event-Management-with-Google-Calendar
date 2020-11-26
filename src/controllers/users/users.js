import * as User from '../../model/userModel';
import * as constants from '../../constants/constants';
import validator from 'email-validator';
import md5 from 'md5';
/**
 *
 * @param {Object} req
 * @param {Object} res
 */
export const userLogin = async (req, res) =>{
  try {
    req.body.password = md5(req.body.password);
    const result = await User.login(req.body);
    res.status(200).json({[constants.UserLoginSuccess]: result});
  } catch (e) {
    res.status(500).json({[constants.UserLoginError]: e});
  }
};
/**
 *
 * @param {Object} req
 * @param {Object} res
 */
export const userRegister = async (req, res) => {
  try {
    if (!(validator.validate(req.body.email))) {
      const e = {'error_message': 'check email'};
      throw e;
    }
    req.body.password = md5(req.body.password);
    const result = await User.register(req.body);
    res.status(200).json({[constants.UserRegisterSuccess]: result});
  } catch (e) {
    res.status(500).json({[constants.UserRegisterError]: e});
  }
};
