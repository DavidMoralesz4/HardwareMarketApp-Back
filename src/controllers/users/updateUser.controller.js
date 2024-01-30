import { updateUserById } from '../../services/database/users.services.js';
import getLogger from '../../utils/log.utils.js';
import { userDTO } from '../../utils/user.utils.js';

const log = getLogger();

/**
 * updateProduct - Actualiza un prooducto a partir de un pid
 * @param {id} req.session
 * @param {updatedData} req.body
 * @returns {updatedUser}
 * @param {data} res
 */
export const updateUser = async (req, res) => {
  const id = req.session.user.userId;
  const info = req.body;

    try {
    const updatedUser = await updateUserById(id, info);

    // Crear un DTO del usuario con la información necesaria
    const userData = userDTO(updatedUser);

    log.info('Usuario actualizado correctamente');
    return res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      Data: userData,
    });
  } catch (error) {
    log.fatal('updateUser - Error al actualizar el usuario: ' + error);
    return res
      .status(500)
      .send({ status: 'error', message: 'Error de servidor' });
  }
};
