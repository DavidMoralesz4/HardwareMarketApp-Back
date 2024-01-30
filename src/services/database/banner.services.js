// services/database/banner.services.js

import Banner from "../../models/schemas/banner.model.js";

const createBanner = async (bannerData) => await Banner.create(bannerData);
const getAllbanner = async () => Banner.find();
const updateBanner = async (_id,updateBaner) => await Banner.findByIdAndUpdate(_id,updateBaner,{new:true});

const getBannerById= async(_id)=>await Banner.findById(_id);


const deletebanner = async(_id)=> await Banner.findByIdAndDelete(_id)

export { 
    createBanner,
    getAllbanner,
    updateBanner,
    getBannerById,
    deletebanner
};
