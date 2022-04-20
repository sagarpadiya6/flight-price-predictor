import express from 'express';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nunjucks from 'nunjucks';
import { User } from '../models';
import verifyToken from '../middlewares/verifyToken';
import validateBody from '../middlewares/validator';
import {
  registerValidation,
  loginValidation,
  deleteValidation,
} from '../validations/user';
import transporter from '../utils/transporter';
import { errorMsg, ERROR_CODE, ROLE } from '../constants';
import authRole from '../auth/authRole';

/**
 * @swagger
 *  tags:
 *    name: User
 *    description: User related API's
 */

const router = express.Router();

/**
 * @openapi
 * /api/v1/user/register:
 *   post:
 *     tags: [User]
 *     description: Register a new user
 *     responses:
 *       200:
 *         description: User successfully created check your email to confirm your account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                    type: string
 *                    description: The uuid v4 of the user.
 *                    example: f8f8f8f-8f8f-8f8f-8f8f-8f8f8f8f8f8
 */
router.post('/register', validateBody(registerValidation), async (req, res) => {
  try {
    // Check if user already exists
    const userWithEmail = await User.findOne({
      where: { email: req.body.email },
    });
    if (userWithEmail) {
      return errorMsg(res, 400, ERROR_CODE.ERR_EMAIL_ALREADY_EXISTS);
    }
    const userWithUsername = await User.findOne({
      where: { username: req.body.username },
    });
    if (userWithUsername) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USERNAME_ALREADY_EXISTS);
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const user = User.build({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user
    const savedUser = await user.save();

    // async email
    jwt.sign(
      { id: savedUser.uuid },
      process.env.EMAIL_SECRET,
      { expiresIn: '1d' },
      (_err, emailToken) => {
        const url = `http://localhost:${process.env['PORT']}/api/v1/user/confirmation/${emailToken}`;
        var content = fs.readFileSync(
          path.resolve(__dirname, '../templates/confirmEmail.njk'),
          'utf8'
        );
        nunjucks.configure({ autoescape: true });
        transporter.sendMail({
          to: savedUser.email,
          subject: 'Confirm email',
          html: nunjucks.renderString(content, { name: req.body.name, url }),
        });
      }
    );

    return res.status(200).send({ id: savedUser.uuid });
  } catch (err) {
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
});

/**
 * @openapi
 * /api/v1/user/resend-email:
 *   post:
 *     tags: [User]
 *     description: Resend confirmation email to the new user
 *     responses:
 *       200:
 *         description: Check your email to confirm your account
 */
router.post('/resend-email', async (req, res) => {
  // Check if user exists
  let user = false;
  user = await User.findOne({ where: { email: req.body.emailOrUsername } });
  if (!user) {
    user = await User.findOne({
      where: { username: req.body.emailOrUsername },
    });
  }
  if (!user) {
    return res.status(400).send('The username or email does not exists');
  }

  try {
    // async email
    jwt.sign(
      { id: user.uuid },
      process.env.EMAIL_SECRET,
      { expiresIn: '1d' },
      (_err, emailToken) => {
        const url = `http://localhost:${process.env['PORT']}/api/v1/user/confirmation/${emailToken}`;
        transporter.sendMail({
          to: user.email,
          subject: 'Confirm email',
          html: `Please click on this link to confirm your email: <a href="${url}" target="_blank>Confirm</a>"`,
        });
      }
    );

    return res.status(200).send({ user: user.uuid });
  } catch (err) {
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
});

/**
 * @openapi
 * /api/v1/user/login:
 *   post:
 *     tags: [User]
 *     description: Login user
 *     responses:
 *       200:
 *         description: User logged in successfully and token has been sent
 */
router.post('/login', validateBody(loginValidation), async (req, res) => {
  // Check if user exists
  let user = false;
  user = await User.findOne({ where: { email: req.body.emailOrUsername } });
  if (!user) {
    user = await User.findOne({
      where: { username: req.body.emailOrUsername },
    });
  }
  if (!user) {
    return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
  }

  // Check if user is confirmed
  if (!user.confirmed) {
    return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_CONFIRMED);
  }

  // verify password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return errorMsg(res, 400, ERROR_CODE.ERR_WRONG_PASSWORD);
  }

  // create and assign token
  const token = jwt.sign({ id: user.uuid }, process.env.TOKEN_SECRET);
  return res.header('auth-token', token).json({ token });
});

/**
 * @openapi
 * /api/v1/user/confirmation/:token:
 *   get:
 *     tags: [User]
 *     description: Verify user
 *     responses:
 *       200:
 *         description: User has been confirmed successfully. Proceed to login
 */
router.get('/confirmation/:token', async (req, res) => {
  try {
    const { id } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    console.log('User: ', id);
    await User.update(
      { confirmed: true },
      {
        where: {
          uuid: id,
        },
      }
    );
    return res.status(200).json({
      message: 'Email confirmed please login',
    });
    // return res.redirect('http://localhost:3000/login');
  } catch (err) {
    return errorMsg(res, 400, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
});

/**
 * @openapi
 * /api/v1/user/:id:
 *   delete:
 *     tags: [User]
 *     description: Delete a user
 *     responses:
 *       200:
 *         description: User has been deleted successfully
 */
router.delete(
  '/:id',
  verifyToken,
  validateBody(deleteValidation),
  authRole(ROLE.ADMIN),
  async (req, res) => {
    // Check if user exists and delete
    const { userUuid: uuid } = req;
    try {
      const user = await User.findOne({ where: { uuid } });
      if (!user) {
        return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
      }
      return res.status(200).send({ id: user.uuid });
    } catch (err) {
      return errorMsg(res, 400, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
    }
  }
);

export default router;
