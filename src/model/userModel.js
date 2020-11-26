import User from '../schema/userSchema';

/**
 * To check whether a user is authorised
 * @param {object} body
 * @return {Promise}
 */
export const login = (body) => {
  return User.findOne({'name': body.name, 'password': body.password});
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
