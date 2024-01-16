/* Los archivos Controller contendrán el la lógica de negocio, serán el nexo entre services y router.
 ej:

const getUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const users = await usersServices.getAll();

    const usersDTOList = users.map(userDTO);

    if (limit && !isNaN(limit) && limit > 0) {
      return usersDTOList.slice(0, limit);
    }

    return res.json({
      status: 'success',
      message: 'Usuarios encontrados',
      data: usersDTOList,
    });
  } catch (error) {
    log.fatal('Error al obtener los usuarios. ' + error.message);
    res
      .status(500)
      .json({ status: 'error', error: 'Error al obtener los usuarios' });
  }
};

*/
