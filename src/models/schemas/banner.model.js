import mongoose from'mongoose';

const bannerSchema = new mongoose.Schema({
  title: String,
  link: String,
  image: Buffer, // Almacena la imagen como un buffer
});

const Banner = mongoose.model('Banner', bannerSchema);

export default Banner;
