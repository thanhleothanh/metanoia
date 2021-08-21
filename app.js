const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();
const collectionRouter = require('./routes/collectionRoutes');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/collections', collectionRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API running!',
  });
});

//global error handler
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const status = error.status || 'fail';
  res.status(statusCode).json({
    status: status,
    message: error.message,
  });
});

module.exports = app;
