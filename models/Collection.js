const mongoose = require('mongoose');
const slugify = require('slugify');
const getRandomBlurhash = require('../utils/randomBlurhash');

const collectionSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String },
    description: { type: String, required: true },
    season: { type: String, required: true },
    releaseDate: { type: String, required: true },
    models: [{ type: String, required: true }],
    designers: [{ type: String, required: true }],
    photographers: [{ type: String, required: true }],
    images: [
      {
        _id: false,
        src: { type: String, required: true },
        blurhash: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

collectionSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

collectionSchema.pre('save', async function (next) {
  this.images.forEach((image) => {
    image.blurhash = getRandomBlurhash();
  });
  next();
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
