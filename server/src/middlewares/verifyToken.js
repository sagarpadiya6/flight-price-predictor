import jwt from 'jsonwebtoken';
import { errorMsg, ERROR_CODE } from '../constants';

function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return errorMsg(res, 401, ERROR_CODE.ERR_TOKEN_NOT_FOUND);
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.userUuid = payload;
    next();
  } catch (err) {
    if (err) {
      return errorMsg(res, 403, ERROR_CODE.ERR_INVALID_TOKEN);
    }
  }
  return null;
}

export default verifyToken;
