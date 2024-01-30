import { Router } from "express";
import { createBanners } from "../controllers/banner/createbanner.controller.js";
import multer from "multer";
import { getAllBanners } from "../controllers/banner/getbannerAll.controller.js";
import { updateBanners } from "../controllers/banner/updateBanner.controller.js";
import { getBanerById } from "../controllers/banner/getBannerById.controller.js";
import { deleteBaner } from "../controllers/banner/deleteBanner.controller.js";

const storage = multer.memoryStorage(); // Guardar la imagen en memoria (puedes ajustar esto según tus necesidades)
const upload = multer({ storage: storage });

const bannerRouter= Router();

//crear banner
bannerRouter.post('/create/banner',upload.single('image'),createBanners)
bannerRouter.get('/get/allbanners', getAllBanners);
bannerRouter.get('/:bid',getBanerById)
bannerRouter.patch('/update/:bid',upload.single('image'), updateBanners)
bannerRouter.delete('/delete/:bid', deleteBaner)




export default bannerRouter;