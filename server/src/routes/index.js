import express from 'express';

const router = express.Router();

/**
 * @swagger
 *  tags:
 *    name: Health
 *    description: Health check
 */

/**
 * @swagger
 * /api/v1/health:
 *   get:
 *     tags: [Health]
 *     summary: Check if the API endpoint is healthy
 *     description: Check if the API endpoints are up and running
 *   responses:
 *     200:
 *       description: API is healthy
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 */
router.get('/', (_req, res) => {
  res.status(200).json({ status: 'OK', msg: 'Healthy' });
});

export default router;
