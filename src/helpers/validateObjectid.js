const ObjectID = require('mongodb').ObjectID;
/**
 *
 * @param {String} ObjectId
 * @return {Boolean}
 */
export const validateId = (ObjectId) => {
  return ObjectID.isValid(ObjectId);
};
