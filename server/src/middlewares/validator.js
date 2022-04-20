import { errorMsg, ERROR_CODE } from '../constants';

export default function validateBody(validateFunction) {
  return (req, res, next) => {
    const { body } = req;
    const { error } = validateFunction(body);
    if (error) {
      return errorMsg(
        res,
        400,
        ERROR_CODE.ERR_SOMETHING_WENT_WRONG,
        error.details[0].message
      );
    }
    next();
  };
}
