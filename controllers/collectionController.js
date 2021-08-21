const Collection = require('./../models/Collection');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const APIFeatures = require('./../utils/APIFeatures');

exports.getCollections = catchAsync(async (req, res, next) => {
  let api = new APIFeatures(Collection.find(), req.query).filter().fields();
  const collections = await api.query;
  res.status(200).json(collections);
});

exports.postCollection = catchAsync(async (req, res, next) => {
  const newCollection = await Collection.create({
    collectionName: req.body.collectionName,
    collectionDescription: req.body.collectionDescription,
    collectionSeason: req.body.collectionSeason,
    collectionReleaseDate: req.body.collectionReleaseDate,
    collectionModels: req.body.collectionModels || [],
    collectionDesigners: req.body.collectionDesigners || [],
    collectionPhotographers: req.body.collectionPhotographers || [],
    collectionImages: req.body.collectionImages || [],
  });
  res.status(201).json(newCollection);
});
