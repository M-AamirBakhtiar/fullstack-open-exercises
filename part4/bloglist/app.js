const express = require('express');
require('express-async-errors');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const blogsRouter = require('./controllers/blogs');
const logger = require('./utils/logger');

logger.info(`connecting to ${config.MONGO_URI}`);

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connecting to MongodB:', error.message);
  });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
