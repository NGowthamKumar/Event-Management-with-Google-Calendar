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
    req.body.password = md5(req.body.password);
    const result = await User.login(req.body);
    redisCache(result._doc.emailId, JSON.stringify(result._doc));
    Response(res, constants.statusSuccess, constants.UserLoginSuccess);
  } catch (e) {
    Response(res, constants.serverError, constants.UserLoginError);
  }
};
/**
 * To register the user
 * @param {Object} req
 * @param {Object} res
 */
export const userRegister = async (req, res) => {
  try {
    if (!(validator.validate(req.body.email))) {
      Response(res, constants.clientError, constants.UserEmailError);
    }
    req.body.password = md5(req.body.password);
    await User.register(req.body);
    Response(res, constants.statusSuccess, constants.UserRegisterSuccess);
  } catch (e) {
    Response(res, constants.serverError, constants.UserRegisterError);
  }
};
/**
 * To find the user details
 * @param {Object} req
 * @param {Object} res
 */
export const userDetails = async (req, res)=> {
  try {
    await User.userDetail(req.params.emailId);
    Response(res, constants.statusSuccess, constants.UserReadSuccess);
  } catch (e) {
    Response(res, constants.serverError, constants.UserReadError);
  }
};

