const mongoose = require('mongoose');
const slugify = require('slugify');

const collectionSchema = mongoose.Schema(
  {
    collectionName: { type: String, required: true, unique: true },
    collectionSlug: { type: String },
    collectionDescription: { type: String, required: true },
    collectionSeason: { type: String, required: true },
    collectionReleaseDate: { type: String, required: true },
    collectionModels: [{ type: String, required: true }],
    collectionDesigners: [{ type: String, required: true }],
    collectionPhotographers: [{ type: String, required: true }],
    collectionImages: [
      {
        _id: false,
        image: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

collectionSchema.pre('save', async function (next) {
  this.collectionSlug = slugify(this.collectionName, { lower: true });
  next();
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
