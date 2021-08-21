const express = require('express');
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');
const productRouter = express.Router();

productRouter
  .route('/')
  .get(productController.getProducts)
  .post(productController.postProduct);

productRouter
  .route('/:slug')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.updateProduct
  );

module.exports = productRouter;
