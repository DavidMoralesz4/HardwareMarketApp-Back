import { getBannerById } from "../../services/database/banner.services.js";

import getLogger from '../../utils/log.utils.js';

const log = getLogger();

export const getBanerById = async (req, res) => {
    const _id = req.params.bid;
    
    
    console.log("hola soy el id",_id);

    try {
        const baner = await getBannerById(_id);
        console.log("holasss", baner);

        if (!baner) {
            log.error(`getBanerById - Baner con id ${_id} no existe`);
            return res.status(404).send({ message: 'Banner not found' });
        }

        res.status(200).json({
            status: 'success',
            message: 'Banner encontrado',
            data: baner,
        });
    } catch (error) {
        log.fatal(
            'getBanerById - Error al obtener el banner: ' + error.message
        );
        return res
            .status(500)
            .send({ status: 'error', message: 'Error de servidor' });
    }
};