/* Los archivos Services contendrán el CRUD hacia la base de datos, ej:*/

import productsModel from "./../../models/schemas/product.model.js";

const createProduct = async (productData) => await productsModel.create(productData)

const getAllProducts = async () => await productsModel.find().lean();

const getProductById = async (_id) => await productsModel.findById(_id).lean().exec();

const updateProduct = async (_id, updateData) => await productsModel.findByIdAndUpdate(_id, updateData, { new: true })

const deleteProduct = async (_id) => await productsModel.findByIdAndDelete(_id)

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
}