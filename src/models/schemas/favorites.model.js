import mongoose from 'mongoose';

const favoritesSchema = new mongoose.Schema({
  // Assuming you want to associate favorites with a user
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
  // Assuming you want to store an array of product IDs as favorites
  products: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Products',
    required: true,
  }],
});

const Favorite = mongoose.model('Favorite', favoritesSchema);

export default Favorite;
