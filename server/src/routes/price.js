import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { once } from 'events';
import { User, Review } from '../models';
import verifyToken from '../middlewares/verifyToken';
import { errorMsg, ERROR_CODE } from '../constants';

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
router.post('/', verifyToken, async (req, res) => {
  const { userUuid: loggedInUser } = req;
  const { depDateTime, arrDateTime, stops, airline, source, destination } =
    req.body;

  console.log({
    depDateTime,
    arrDateTime,
    stops,
    airline,
    source,
    destination,
  });
  try {
    const user = await User.findOne({ where: { uuid: loggedInUser.id } });
    if (!user) {
      return errorMsg(res, 400, ERROR_CODE.ERR_USER_NOT_FOUND);
    }

    const py = spawn('python3', [
      // "-m",
      path.resolve(__dirname, '../../../ai/flight_price/flight_price.py'),
      '--dep_date_time=' + depDateTime,
      '--arr_date_time=' + arrDateTime,
      '--stops=' + stops,
      '--airline=' + airline,
      '--source=' + source,
      '--destination=' + destination,
      // "--debug",
    ]);
    let output = '';

    py.stdin.setEncoding = 'utf-8';

    py.stdout.on('data', (data) => {
      output += data.toString();
      // console.log("output was generated: " + output);
    });
    // Handle error output
    py.stderr.on('data', (data) => {
      // As said before, convert the Uint8Array to a readable string.
      // console.log("error:" + data);
    });
    py.stdout.on('end', async function (code) {
      // console.log("output: " + output);
      // console.log(`Exit code is: ${code}`);
    });

    await once(py, 'close');

    console.log('output: ' + output);

    return res.status(200).json({ price: JSON.parse(output) });
  } catch (err) {
    console.log(err);
    return errorMsg(res, 500, ERROR_CODE.ERR_SOMETHING_WENT_WRONG, err);
  }
});

export default router;
