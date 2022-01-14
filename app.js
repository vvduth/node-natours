const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json()); // for middleware
app.use(express.static(`${__dirname}/public`)); // serving static files
app.use((req, res, next) => {
  console.log('Hello from the middlewares');
  next();
});

app.use((req, res, next) => {
  req.requestTimeq = new Date().toISOString();
  next();
});

// 2) Routes handler

// 3) ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
