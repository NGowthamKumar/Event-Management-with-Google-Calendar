
/**
 * @param {Object} res
 * @param {Number} code
 * @param {Any} message
 */
export const Response = (res, code, message)=>{
  switch (code) {
    case 200: res.status(code).json({'Success': message}); break;
    case 400: res.status(code).json({'Client_error': message}); break;
    case 500: res.status(code).json({'Server_error': message});
  }
};
