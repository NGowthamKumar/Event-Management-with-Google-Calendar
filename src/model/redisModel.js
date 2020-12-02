import {client} from '../config/redis';
/**
 * To store the Email-Id and type of the user
 * @param {Email} emailId
 * @param {Object} details
 */
export const redisCache =(emailId, details)=>{
  client.set(emailId, details);
};
