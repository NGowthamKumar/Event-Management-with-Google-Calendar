import * as User from '../../model/userModel';
import * as constants from '../../constants/constants';
import {Response} from '../../middllewares/responseMiddleware';
import validator from 'email-validator';
import md5 from 'md5';
import {redisCache} from '../../model/redisModel';
/**
 *
 * @param {Object} req
 * @param {Object} res
 */
export const userLogin = async (req, res) =>{
  try {
    if (!(validator.validate(req.body.emailId))) {
      Response(res, constants.clientError, constants.UserEmailError);
      return;
    }
    req.body.password = md5(req.body.password);
    const result = await User.login(req.body);
    redisCache(result._doc.emailId, JSON.stringify(result._doc));
    Response(res, constants.statusSuccess, constants.UserLoginSuccess);
    return;
  } catch (e) {
    Response(res, constants.serverError, constants.UserLoginError);
    return;
  }
};
/**
 * To register the user
 * @param {Object} req
 * @param {Object} res
 */
export const userRegister = async (req, res) => {
  try {
    if (!(validator.validate(req.body.emailId))) {
      Response(res, constants.clientError, constants.UserEmailError);
      return;
    }
    req.body.password = md5(req.body.password);
    await User.register(req.body);
    Response(res, constants.statusSuccess, constants.UserRegisterSuccess);
    return;
  } catch (e) {
    Response(res, constants.serverError, constants.UserRegisterError);
    return;
  }
};
/**
 * To find the user details
 * @param {Object} req
 * @param {Object} res
 */
export const userDetails = async (req, res)=> {
  try {
    if (!(validator.validate(req.body.emailId))) {
      Response(res, constants.clientError, constants.UserEmailError);
      return;
    }
    await User.userDetail(req.params.emailId);
    Response(res, constants.statusSuccess, constants.UserReadSuccess);
    return;
  } catch (e) {
    Response(res, constants.serverError, constants.UserReadError);
    return;
  }
};

