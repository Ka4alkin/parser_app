require('dotenv').config();
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
const config = require('./cron/config/index');
const scheduler = require('./cron/scheduler');
const authRouter = require('./auth/authRouter');
import * as middlewares from './middlewares';
import api from './api';
import MessageResponse from './interfaces/MessageResponse';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());


app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/', api);
app.use('/', authRouter);



app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
scheduler.initCrons(config);
export default app;
