import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartCollection = 'Carts';

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Products',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});

const cartSchema = new mongoose.Schema({
  products: [cartItemSchema], // Este array products recibe los objetos (product) del modelo de arriba.
  totalAmount: {
    type: Number,
    default: 0,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
});

cartSchema.plugin(mongoosePaginate);

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;
