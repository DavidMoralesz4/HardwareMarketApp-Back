import { getAllbanner } from "../../services/database/banner.services.js";

export const getAllBanners = async (req, res) => {
  try {
    const banners = await getAllbanner();
    res.json({ banners });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving banners.' });
  }
};