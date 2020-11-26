
/**
 * @param {Object} res
 * @param {Number} code
 * @param {String} message
 */
export const Response = (res, code, message)=>{
  switch (code) {
    case 200: res.status(code).json({'Success': message}); break;
    case 400: res.status(code).json({'Client error': message}); break;
    case 500: res.status(code).json({'Server error': message});
  }
};
