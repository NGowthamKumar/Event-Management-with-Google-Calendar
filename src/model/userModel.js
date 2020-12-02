import User from '../schema/userSchema';

/**
 * To check whether a user is authorised
 * @param {object} body
 * @return {Promise}
 */
export const login = (body) => {
  return User.findOne({'emailId': body.emailId, 'password': body.password});
};

/**
 * To register a new user
 * @param {Object} body
 * @return {Promise}
 */
export const register = (body) =>{
  const user = new User(body);
  return user.save();
};

/**
 * To show a single event details
 * @param {String} emailId
 * @return {promise}
 */
export const userDetail = (emailId) => {
  return User.findOne({emailId});
};

