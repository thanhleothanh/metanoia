const express = require('express');
const collectionController = require('./../controllers/collectionController');
const authController = require('./../controllers/authController');
const collectionRouter = express.Router();

collectionRouter
  .route('/')
  .get(collectionController.getCollections)
  .post(collectionController.postCollection);

collectionRouter.route('/:slug').get(collectionController.getCollection);
// .patch(
//   authController.protect,
//   authController.restrictTo('admin'),
//   collectionController.updateCollection
// );
module.exports = collectionRouter;
