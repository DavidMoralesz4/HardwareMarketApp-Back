import { updateProduct } from '../../services/database/product.services.js';
import getLogger from '../../utils/log.utils.js';
import { uploadFile } from '../../utils/uploadFile.utils.js';

const log = getLogger();

/**
 * updateProduct - Actualiza un prooducto a partir de un pid
 * @param {pid} req.params
 * @returns {product}
 * @param {updatedData} req.body
 * @returns {updatedProduct}
 * @param {data} res
 */
export const updateProducts = async (req, res) => {
  const _id = req.params.pid;
  const data = req.body;
  const thumbnails = [];
  const images = req.files.thumbnails;
  const updatedData = { data, thumbnails };

  try {
    if (images && images.length > 0) {
      for (const file of images) {
        const { downloadURL } = await uploadFile(file);
        thumbnails.push(downloadURL);
      }
    }
    const updatedProduct = await updateProduct(_id, updatedData);

    log.info('Producto actualizado correctamente');
    return res.status(200).json({
      status: 'success',
      message: 'Producto actualizado correctamente',
      data: updatedProduct,
    });
  } catch (error) {
    log.fatal(
      'updateProducts - Error al actualizar el producto: ' + error.message
    );
    return res
      .status(500)
      .send({ status: 'error', message: 'Error de servidor' });
  }
};

// TODO: CREAR CONTROLADOR
/* Deberá prermitir: 
     - modificar cualquier dato del producto (salvo el id),
     - pausar un producto
     - rehabilitar un producto
     A tener en cuenta:
     - el producto solo puede ser modificado por su dueño (debera verificarse la relacion entre el producto y el creador del mismo mediante middleware)
     */
