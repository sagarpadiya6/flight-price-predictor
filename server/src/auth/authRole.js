import { errorMsg, ERROR_CODE } from '../constants';
import { User } from '../models';

export default function authRole(role) {
  return async (req, res, next) => {
    // Check if user exists

    const { userUuid: loggedInUser } = req; // This middleware should be used after verifyToken

    try {
      const user = await User.findOne({ where: { uuid: loggedInUser.id } });
      if (!user) {
        return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
      }
      if (user.role !== role) {
        return errorMsg(res, 401, ERROR_CODE.ERR_USER_NOT_AUTHORIZED);
      }
      return next();
    } catch (err) {
      return errorMsg(res, 500, ERROR_CODE.ERR_INTERNAL_SERVER_ERROR, err);
    }
  };
}
