import { getAllFavorites } from "../../services/database/favorites.services.js";


export const getAllFavorite = async (req, res) => {
    const userId = req.params.fid; 
  try {
    const favorite = await getAllFavorites({ user: userId });
    res.json({ favorite });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving banners.' });
  }
};