import Favorite from "../../models/schemas/favorites.model.js";
import { createFavorite } from "../../services/database/favorites.services.js";

const addProductFavorite = async (req, res) => {
  const userId = req.params.fid;
  const favoriteData = req.body;

  try {
    // Verifica si el favorito ya existe para evitar duplicados
    const { products } = favoriteData;
    if (!products || !Array.isArray(products) || products.length === 0) {
      res.status(400).send("Products array is missing or empty");
      return;
    }

    // Busca un favorito existente para el usuario con los mismos productos
    const existingFavorite = await Favorite.findOne({
      user: userId,
      products: { $all: products }, // Todos los productos deben coincidir
    });

    if (existingFavorite) {
      res.json({ message: 'Los productos ya están en favoritos.', existingFavorite });
      return;
    }

    // Crea un nuevo favorito con todos los productos asociados al usuario
    const newFavorite = { user: userId, products };
    const createdFavorite = await createFavorite(newFavorite);

    res.json({ message: 'Productos agregados a favoritos.', createdFavorite });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar a favoritos.' });
  }
};

export { addProductFavorite };
