const Collection = require('./../models/Collection');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const APIFeatures = require('./../utils/APIFeatures');

exports.getCollections = catchAsync(async (req, res, next) => {
  let api = new APIFeatures(Collection.find(), req.query).filter().fields();
  const collections = await api.query;
  res.status(200).json(collections);
});
exports.getCollection = catchAsync(async (req, res, next) => {
  const collection = await Collection.findOne({
    slug: req.params.slug,
  });
  if (!collection) throw new AppError('No collection found!', 404);
  res.status(200).json(collection);
});

exports.postCollection = catchAsync(async (req, res, next) => {
  const newCollection = await Collection.create({
    name: req.body.name,
    description: req.body.description,
    season: req.body.season,
    releaseDate: req.body.releaseDate,
    models: req.body.models || [],
    designers: req.body.designers || [],
    photographers: req.body.photographers || [],
    images: req.body.images || [],
  });
  res.status(201).json(newCollection);
});

exports.updateCollection = catchAsync(async (req, res, next) => {
  const collection = await Collection.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!collection) throw new AppError('No collection found!', 404);

  res.status(201).json(collection);
});
