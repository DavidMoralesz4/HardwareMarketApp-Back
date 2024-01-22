import mongoose from 'mongoose';
import mongoosePaginate from "mongoose-paginate-v2";

const productCollection = "Products"

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required: true,
        unique:true
    },
    price:{
        type: Number,
        required: true,
        min:0.0,
        max: Number.MAX_VALUE
    },
    status:{
        type:Boolean,
        required: true
    },
    stock:{
        type:Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    thumbnails:{
        type:[String],
        required: false
    },
    owner:{
        type: mongoose.SchemaType.ObjectId,
        ref:"User",
        required:true
    }
})

productSchema.plugin(mongoosePaginate)

const productsModel = mongoose.model(productCollection, productSchema)

export default productsModel