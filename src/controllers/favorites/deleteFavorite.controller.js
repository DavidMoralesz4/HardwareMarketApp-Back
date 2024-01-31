import Favorite from '../../models/schemas/favorites.model.js';


export const deleteFavorite = async (req, res) => {
  const userId = req.params.fid; // Obtén el ID del usuario de los parámetros
  const favoriteId = req.params.favid; // Obtén el ID del favorito de los parámetros
  const productIdToDelete = req.params.pid; // Obtén el ID del producto a eliminar de los parámetros

  try {
    // Verifica si el favorito pertenece al usuario
    const existingFavorite = await Favorite.findOne({ _id: favoriteId, user: userId });
    if (!existingFavorite) {
      res.status(404).json({ message: 'Favorito no encontrado o no pertenece al usuario.' });
      return;
    }

    // Utiliza $pull para eliminar el producto de la lista de productos
    await Favorite.updateOne(
      { _id: favoriteId },
      { $pull: { products: productIdToDelete } }
    );

    res.json({ message: 'Producto eliminado del favorito exitosamente.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto del favorito.' });
  }
};
