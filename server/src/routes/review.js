import express from 'express';
import { User, Review } from '../models';
import verifyToken from '../middlewares/verifyToken';
import { errorMsg } from '../constants';

/**
 * @swagger
 *  tags:
 *    name: Review
 *    description: Review related API's
 */

const router = express.Router();

/**
 * @openapi
 * /api/v1/review:
 *   post:
 *     tags: [Review]
 *     description: Add a review
 *     responses:
 *       200:
 *         description: User review submitted successfully
 */
router.post('/', verifyToken, async (req, res) => {
  const { userUuid: loggedInUser } = req;
  const { review, star, recommendation } = req.body;

  try {
    const dbUser = await User.findOne({ where: { uuid: loggedInUser.id } });
    if (!dbUser) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
    }
    const userReview = await Review.create({
      userId: dbUser.id,
      star,
      review,
      recommendation,
    });

    return res.status(200).json({ review: userReview });
  } catch (err) {
    console.log(err);
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
});

/**
 * @openapi
 * /api/v1/review:
 *   put:
 *     tags: [Review]
 *     description: Edit user review
 *     responses:
 *       200:
 *         description: User review edited successfully
 */
router.put('/', verifyToken, async (req, res) => {
  const { userUuid: loggedInUser } = req;
  const { review, star, recommendation } = req.body;

  try {
    const dbUser = await User.findOne({ where: { uuid: loggedInUser.id } });
    if (!dbUser) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
    }
    const userReview = await Review.findOne({ where: { userId: dbUser.id } });
    if (!userReview) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_REVIEW_NOT_FOUND);
    }
    userReview.star = star;
    userReview.review = review;
    userReview.recommendation = recommendation;
    await userReview.save();

    return res.status(200).json({ review: userReview });
  } catch (err) {
    console.log(err);
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
});

/**
 * @openapi
 * /api/v1/review:
 *   delete:
 *     tags: [Review]
 *     description: Delete a user review
 *     responses:
 *       200:
 *         description: User review submitted successfully
 */
router.delete('/', verifyToken, async (req, res) => {
  const { userUuid: loggedInUser } = req;
  try {
    const dbUser = await User.findOne({ where: { uuid: loggedInUser.id } });
    if (!dbUser) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
    }
    const userReview = await Review.findOne({ where: { userId: dbUser.id } });
    if (!userReview) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_REVIEW_NOT_FOUND);
    }
    await userReview.destroy();

    return res.status(200).json({ review: userReview });
  } catch (err) {
    console.log(err);
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
});

router.get('/', verifyToken, async (req, res) => {
  const { userUuid: loggedInUser } = req;
  try {
    const dbUser = await User.findOne({ where: { uuid: loggedInUser.id } });
    if (!dbUser) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
    }
    const allReviews = await Review.findAll();
    return res.status(200).json({ reviews: allReviews });
  } catch (err) {
    console.log(err);
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
});

export default router;
