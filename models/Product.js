const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = mongoose.Schema(
  {
    productName: { type: String, required: true, unique: true },
    productSlug: { type: String },
    productCategory: { type: String, required: true },
    productDescription: { type: String, required: true },
    productSeason: { type: String, default: '' },
    productReleaseDate: { type: String, default: '' },
    productImages: [String],
    productPrice: {
      type: Number,
      required: true,
      validate: {
        validator: function (val) {
          return val > 0;
        }, // only work when creating new DOC, not update!!
        message: 'Invalid Price',
      },
    },
    productDiscountPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          return val > 0;
        }, // only work when creating new DOC, not update!!
        message: 'Invalid Discount Price!',
      },
    },
    productInStock: [
      {
        _id: false,
        size: { type: String, required: true },
        inStock: { type: Number, required: true },
      },
    ],
    productCollection: {
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
  this.productSlug = slugify(this.productName, { lower: true });
  next();
});

productSchema.virtual('totalInStock').get(function () {
  let total = 0;
  this.productInStock.forEach((ele) => (total += ele.inStock));
  return total;
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
