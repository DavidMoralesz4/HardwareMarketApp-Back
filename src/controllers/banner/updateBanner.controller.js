import { updateBanner } from "../../services/database/banner.services.js";
import getLogger from "../../utils/log.utils.js";
const log = getLogger();

/**
 * updatebanner - Actualiza un banner a partir de un bid
 * @param {bid} req.params
 * @returns {banner}
 * @param {updateBaner} req.body
 * @returns {updateBaners}
 * @param {data} res
 */
export const updateBanners = async (req, res) => {
    const _id = req.params.bid;
   
    const updateBaner = req.body;
    console.log(updateBaner)
    try {
        const updateBaners = await updateBanner(_id, updateBaner);
       
        log.info('Producto actualizado correctamente')
        return res.status(200).json({
            status: 'success',
            message: 'Producto actualizado correctamente',
            data: updateBaners,
        });
    } catch (error) {
        log.fatal(
            'updateBanner - Error al actualizar el banner: ' + error.message
        );
        return res
            .status(500)
            .send({ status: 'error', message: 'Error de servidor' });
    }
}
