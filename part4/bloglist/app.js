const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blog');
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

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
