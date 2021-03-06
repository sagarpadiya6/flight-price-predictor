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
import { errorMsg, ERROR_CODE, ROLE, tokenExpiration } from '../constants';
import authRole from '../auth/authRole';

// TODO: Store and send roles as an array

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
      { expiresIn: tokenExpiration.EMAIL_TOKEN_EXPIRATION },
      async (_err, emailToken) => {
        const url = `http://localhost:${process.env['PORT']}/api/v1/user/confirmation/${emailToken}`;
        try {
          var content = fs.readFileSync(
            path.resolve(__dirname, '../templates/confirmEmail.njk'),
            'utf8'
          );
          nunjucks.configure({ autoescape: true });
          await transporter.sendMail({
            to: savedUser.email,
            subject: 'Confirm email',
            html: nunjucks.renderString(content, { name: req.body.name, url }),
          });
        } catch (err2) {
          if (err2) {
            console.log(err2);
          }
        }
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
  try {
    // Check if user exists
    let user = false;
    user = await User.findOne({ where: { email: req.body.emailOrUsername } });
    if (!user) {
      user = await User.findOne({
        where: { username: req.body.emailOrUsername },
      });
    }
    if (!user) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND, err);
    }

    if (user.confirmed) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_ALREADY_CONFIRMED);
    }

    // async email
    jwt.sign(
      { id: user.uuid },
      process.env.EMAIL_SECRET,
      { expiresIn: tokenExpiration.EMAIL_TOKEN_EXPIRATION },
      async (err, emailToken) => {
        const url = `http://localhost:${process.env['PORT']}/api/v1/user/confirmation/${emailToken}`;

        try {
          var content = fs.readFileSync(
            path.resolve(__dirname, '../templates/confirmEmail.njk'),
            'utf8'
          );
          nunjucks.configure({ autoescape: true });
          await transporter.sendMail({
            to: user.email,
            subject: 'Confirm email',
            html: nunjucks.renderString(content, { name: req.body.name, url }),
          });
        } catch (err2) {
          if (err2) {
            console.log(err2);
          }
        }
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
  const accessToken = jwt.sign(
    { id: user.uuid, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: tokenExpiration.ACCESS_TOKEN_EXPIRATION,
    }
  );
  const refreshToken = jwt.sign(
    { id: user.uuid, role: user.role },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: tokenExpiration.REFRESH_TOKEN_EXPIRATION,
    }
  );

  return res
    .header('Authorization', `Bearer ${accessToken}`)
    .cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
    .json({ id: user.uuid, token: accessToken, role: user.role });
});

router.get('/logout', verifyToken, (req, res) => {
  try {
    res.clearCookie('refresh_token');
    return res.status(200).json({
      msg: 'Logged out successfully',
    });
  } catch (err) {
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
});

router.get('/refresh', async (req, res) => {
  try {
    const currentRefreshToken = req.cookies.refresh_token;
    if (!currentRefreshToken) {
      return errorMsg(res, 400, ERROR_CODE.ERR_REFRESH_TOKEN_NOT_FOUND);
    }

    // verify refresh token
    const { id: uuid } = jwt.verify(
      currentRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Check if user exists
    let user = false;
    user = await User.findOne({ where: { uuid } });
    if (!user) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
    }

    // create and assign token
    const accessToken = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: tokenExpiration.ACCESS_TOKEN_EXPIRATION,
      }
    );
    const refreshToken = jwt.sign(
      { id: user.uuid, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: tokenExpiration.REFRESH_TOKEN_EXPIRATION,
      }
    );

    return res
      .header('Authorization', `Bearer ${accessToken}`)
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ id: user.uuid, token: accessToken, role: user.role });
  } catch (err) {
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
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

    // if user was already confirmed.
    const user = await User.findOne({ where: { uuid: id } });
    if (user.confirmed) {
      return res.redirect('http://localhost:3000/login?confirmed=true');
    }

    await User.update(
      { confirmed: true },
      {
        where: {
          uuid: id,
        },
      }
    );
    // return res.status(200).json({
    //   message: 'Email confirmed please login',
    // });
    return res.redirect('http://localhost:3000/login?confirmed=true');
  } catch (err) {
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
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
    const { userUuid: loggedInUser } = req;
    try {
      const user = await User.findOne({ where: { uuid: loggedInUser.id } });
      if (!user) {
        return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
      }
      // Verify the password of the admin
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return errorMsg(res, 400, ERROR_CODE.ERR_WRONG_PASSWORD);
      }
      await User.destroy({ where: { uuid: req.params.id } });
      return res.status(200).send({ id: user.uuid });
    } catch (err) {
      return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
    }
  }
);

export default router;
