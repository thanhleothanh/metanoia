const Product = require('./../models/Product');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/AppError');
const APIFeatures = require('./../utils/APIFeatures');

exports.getProducts = catchAsync(async (req, res, next) => {
  let api = new APIFeatures(Product.find(), req.query).filter().fields().sort();
  const products = await api.query;
  res.status(200).json(products);
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    productSlug: req.params.slug,
  }).populate('productCollection');
  if (!product) throw new AppError('No product found!', 404);
  res.status(200).json(product);
});

exports.postProduct = catchAsync(async (req, res, next) => {
  const newProduct = await Product.create({
    productName: req.body.productName,
    productDescription: req.body.productDescription,
    productSeason: req.body.productSeason,
    productReleaseDate: req.body.productReleaseDate,
    productCategory: req.body.productCategory,
    productPrice: req.body.productPrice,
    productDiscountPrice: req.body.productDiscountPrice,
    productImages: req.body.productImages,
    productCollection: req.body.productCollection,
    productInStock: req.body.productInStock || [
      { size: '1Meta', inStock: 0 },
      { size: '2Meta', inStock: 0 },
      { size: '3Meta', inStock: 0 },
    ],
  });
  res.status(201).json(newProduct);
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOneAndUpdate(
    { productSlug: req.params.slug },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!product) throw new AppError('No product found!', 404);

  res.status(201).json(product);
});
