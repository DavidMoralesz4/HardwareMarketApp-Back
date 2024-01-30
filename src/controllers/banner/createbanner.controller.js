
import { createBanner } from "../../services/database/banner.services.js";

export const createBanners = async (req, res) => {
    const bannerData = req.body;
    const createdBanners=[];
    try {
        
      const { title, link } = bannerData;
      
      if(!title || !link ){
        res.status(400).send("Required fields are missing")
        return
      }
      const image = req.file.buffer; // La imagen se almacena en req.file.buffer
      const newBanner ={ title, link, image };
      const createdBanner = await createBanner(newBanner);
      createdBanners.push(createdBanner)

     
  
      res.json({ message: 'Banner created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating banner.' });
    }
  };