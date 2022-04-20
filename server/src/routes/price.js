import express from 'express';
import { User, Review } from '../models';
import verifyToken from '../middlewares/verifyToken';
import { errorMsg } from '../constants';

/**
 * @swagger
 *  tags:
 *    name: Flight Price
 *    description: Flight price prediction API
 */

const router = express.Router();

/**
 * @openapi
 * /api/v1/price:
 *   get:
 *     tags: [Flight Price]
 *     description: Get flight price prediction
 *     responses:
 *       200:
 *         description: Predicted flight price sent successfully
 */
router.get('/', verifyToken, async (req, res) => {
  const { userUuid: uuid } = req;
  const { review, star, recommendation } = req.body;

  try {
    const user = await User.findOne({ where: { uuid } });
    if (!user) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
    }
    const userReview = await Review.create({
      star,
      review,
      recommendation,
      userId: user.id,
    });

    return res.status(200).json({ review: userReview });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

export default router;
