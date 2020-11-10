import User from '../schema/userSchema';

/**
 *
 * @param {object} body
 * @return {*}
 */
export const addUser = (body) => {
  const user = new User(body);
  return user.save();
};
