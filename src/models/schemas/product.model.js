import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'Products';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.0,
    max: Number.MAX_VALUE,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['nuevo', 'usado'],
  },
  thumbnails: {
    type: [String],
    required: false,
  },
  lastModifyDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});

productSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productCollection, productSchema);

export default productsModel;
