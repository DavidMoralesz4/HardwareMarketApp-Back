import Favorite from '../../models/schemas/favorites.model.js';

export const deleteFavorite = async (req, res) => {
  const userIdFromSession = req.session.user.userId; // Obtén el ID del usuario de la sesión
  
  const favoriteId = req.params.favid; // Obtén el ID del favorito de los parámetros
  const productIdToDelete = req.params.pid; // Obtén el ID del producto a eliminar de los parámetros

  try {
    // Verifica si el favorito pertenece al usuario de la sesión
    const existingFavorite = await Favorite.findOne({ _id: favoriteId, user: userIdFromSession });
    if (!existingFavorite) {
      res.status(404).json({ message: 'Favorito no encontrado o no pertenece al usuario.' });
      return;
    }

    // Utiliza findByIdAndUpdate con $pull para eliminar el producto de la lista de productos
    const updatedFavorite = await Favorite.findByIdAndUpdate(
      favoriteId,
      { $pull: { products: productIdToDelete } },
      { new: true } // Devuelve el documento actualizado
    );

    res.json({ message: 'Producto eliminado del favorito exitosamente.', updatedFavorite });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto del favorito.' });
  }
};
