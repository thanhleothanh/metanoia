const mongoose = require('mongoose');
const slugify = require('slugify');
const getRandomBlurhash = require('../utils/randomBlurhash');

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String },
    category: { type: String, required: true },
    description: { type: String, required: true },
    season: { type: String, default: '' },
    releaseDate: { type: String, default: '' },
    images: [
      {
        _id: false,
        src: { type: String, required: true },
        blurhash: { type: String },
      },
    ],
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          return val > 0;
        }, // only work when creating new DOC, not update!!
        message: 'Invalid Price',
      },
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          return val > 0;
        }, // only work when creating new DOC, not update!!
        message: 'Invalid Discount Price!',
      },
    },
    inStock: [
      {
        _id: false,
        size: { type: String, required: true },
        inStock: { type: Number, required: true },
      },
    ],
    fromCollection: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

productSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.pre('save', async function (next) {
  this.images.forEach((image) => {
    image.blurhash = getRandomBlurhash();
  });
  next();
});

productSchema.virtual('totalInStock').get(function () {
  let total = 0;
  this.inStock.forEach((ele) => (total += ele.inStock));
  return total;
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
