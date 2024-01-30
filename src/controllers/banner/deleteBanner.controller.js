import { deletebanner } from "../../services/database/banner.services.js";
import getLogger from '../../utils/log.utils.js';
const log = getLogger();


export const deleteBaner = async(req,res)=>{
    const _id =req.params.bid;
    console.log(_id)
    try {
        const ban = await deletebanner(_id);
        if(!ban){
            log.error(`getBanerById - Baner con id ${_id} no existe`);
            return res.status(404).send({ message: 'Banner not found' });
        }
        res.status(200).json({
            status: 'success',
            message: 'Banner Eliminado',
            
        });
    } catch (error) {
        log.fatal(
            'getBanerById - Error al obtener el banner: ' + error.message
        );
        return res
            .status(500)
            .send({ status: 'error', message: 'Error de servidor' });
    
    }
}