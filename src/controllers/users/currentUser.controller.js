import {
  getUserByEmail,
  getUserById,
} from '../../services/database/users.services.js';
import getLogger from '../../utils/log.utils.js';
import { userDTO } from '../../utils/user.utils.js';

const log = getLogger();

export const currentUser = async (req, res) => {
  try {
    //   Verificar si hay un usuario en la sesión actual
    if (req.session.user) {
      // Obtener el usuario actual
      const userId = req.session.user.userId;
      // Buscar el usuario en la base de datos
      const user = await getUserById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      // Crear un DTO del usuario con la información necesaria
      const userData = userDTO(user);
      // Devolver el usuario en la respuesta
      res.status(200).json({
        status: 'success',
        message: 'Current user',
        data: userData,
      });
    } else {
      // No hay un usuario en la sesión actual
      res.json(null);
    }
  } catch (error) {
    log.error('Error al buscar el usuario:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
};
