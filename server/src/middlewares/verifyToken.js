import jwt from 'jsonwebtoken';
import { errorMsg, ERROR_CODE } from '../constants';

function verifyToken(req, res, next) {
  const token = req.header('auth-token');
  if (!token) {
    return errorMsg(res, 401, ERROR_CODE.ERR_TOKEN_NOT_FOUND);
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userUuid = verified;
    next();
  } catch (err) {
    if (err) {
      return errorMsg(res, 401, ERROR_CODE.ERR_INVALID_TOKEN);
    }
  }
  return null;
}

export default verifyToken;
