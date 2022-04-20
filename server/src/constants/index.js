export const ROLE = {
  ADMIN: 'admin',
  USER: 'user',
};

export const ERROR_CODE = {
  // General error codes
  ERR_SOMETHING_WENT_WRONG: 'ERR_SOMETHING_WENT_WRONG',
  // User error codes
  ERR_USER_NOT_FOUND: 'ERR_USER_NOT_FOUND',
  ERR_USER_NOT_CONFIRMED: 'ERR_USER_NOT_CONFIRMED',
  ERR_INVALID_TOKEN: 'ERR_INVALID_TOKEN',
  ERR_TOKEN_NOT_FOUND: 'ERR_TOKEN_NOT_FOUND',
  ERR_USER_NOT_AUTHORIZED: 'ERR_USER_NOT_AUTHORIZED',
  ERR_WRONG_PASSWORD: 'ERR_WRONG_PASSWORD',
  ERR_EMAIL_ALREADY_EXISTS: 'ERR_EMAIL_ALREADY_EXISTS',
  ERR_USERNAME_ALREADY_EXISTS: 'ERR_USERNAME_ALREADY_EXISTS',
  // Review error codes
  ERR_USER_REVIEW_NOT_FOUND: 'ERR_USER_REVIEW_NOT_FOUND',
};

export const ERROR_MESSAGE = {
  // General error messages
  [ERROR_CODE.ERR_SOMETHING_WENT_WRONG]: 'Something went wrong',
  // User error messages
  [ERROR_CODE.ERR_USER_NOT_FOUND]: 'The username or email does not exists',
  [ERROR_CODE.ERR_USER_NOT_CONFIRMED]: 'Please confirm your email to login',
  [ERROR_CODE.ERR_INVALID_TOKEN]: 'Invalid token',
  [ERROR_CODE.ERR_TOKEN_NOT_FOUND]: 'Access Denied',
  [ERROR_CODE.ERR_USER_NOT_AUTHORIZED]: 'Access Denied',
  [ERROR_CODE.ERR_WRONG_PASSWORD]: 'Wrong password',
  [ERROR_CODE.ERR_EMAIL_ALREADY_EXISTS]: 'Email already exists',
  [ERROR_CODE.ERR_USERNAME_ALREADY_EXISTS]: 'Username already exists',
  // Review error messages
  [ERROR_CODE.ERR_USER_REVIEW_NOT_FOUND]: 'User review not found',
};

export const errorMsg = (
  res,
  statusCode = 500,
  errCode = ERROR_CODE.ERR_SOMETHING_WENT_WRONG,
  message = ERROR_MESSAGE[errCode]
) => {
  return res.status(statusCode).json({
    status: 'Not OK',
    code: statusCode,
    error_code: errCode,
    message,
  });
};

export const successMsg = (res, statusCode = 200, message) => {
  return res.status(statusCode).json({
    status: 'OK',
    code: statusCode,
    message,
  });
};
