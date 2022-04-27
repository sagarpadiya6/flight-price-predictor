import express from 'express';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// import routes
import indexRouter from './routes/index';
import userRouter from './routes/user';
import reviewRouter from './routes/review';
import priceRouter from './routes/price';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  })
);
app.use(compression());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// routers
app.use('/api/v1/health', indexRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/price', priceRouter);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Flight API',
      description: 'Flight API Information',
      contact: {
        name: 'Sagar Padiya',
        email: 'sagarpadiya7000@gmail.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Development server',
      },
    ],
  },
  // Paths to files containing OpenAPI definitions
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const server = http.createServer(app);

export { app };
export default server;
