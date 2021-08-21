const express = require('express');
const collectionController = require('./../controllers/collectionController');

const collectionRouter = express.Router();

collectionRouter
  .route('/')
  .get(collectionController.getCollections)
  .post(collectionController.postCollection);

module.exports = collectionRouter;
