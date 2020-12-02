import {Response} from './responseMiddleware';
import * as constants from '../constants/constants';
import {client} from '../config/redis';
import validator from 'email-validator';
/**
 * To fetch the cache from redis
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
export const cache = (req, res, next) => {
  const emailId = req.body.emailId;
  if (!(validator.validate(emailId))) {
    Response(res, constants.clientError, constants.UserEmailError);
    return;
  }
  client.get(emailId, (err, data) => {
    if (err || (data === null)) {
      Response(res, constants.clientError, constants.permissionError);
    } else {
      const Data = JSON.parse(data);
      if (Data.type == 'TeamLead/Manager') {
        next();
      }
    }
  });
};
