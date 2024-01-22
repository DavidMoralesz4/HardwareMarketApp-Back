/* Los archivos Services contendrán el CRUD hacia la base de datos, ej:*/

import productsModel from "./../../models/schemas/product.model.js";

export const createProduct = async (productData) => await productsModel.create(productData)

export const getAllProducts = async () => await productsModel.find().lean();


export const getProductById = async (_id) => await productsModel.findById(_id).lean().exec();

