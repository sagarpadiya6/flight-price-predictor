import express from 'express';
import http from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// import routes
import indexRouter from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// routers middleware
app.use('/', indexRouter);

const server = http.createServer(app);

export { app };
export default server;
