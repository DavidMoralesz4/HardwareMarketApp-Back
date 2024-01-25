import { getAllProductsPaginated } from '../../services/database/product.services.js';
import getLogger from '../../utils/log.utils.js';

const log = getLogger();

/**
 * getProductById - Obtiene un prooducto a partir de un pid
 * @param {limit} req.query
 * @param {page} req.query
 * @param {sort} req.query
 * @param {minPrice} req.query
 * @param {maxPrice} req.query
 * @returns {products object}
 * @param {response} res
 */

export const getProducts = async (req, res) => {
  // Obtener los query params
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const sort = req.query.sort;
  const minPrice = parseFloat(req.query.minPrice);
  const maxPrice = parseFloat(req.query.maxPrice);
  const query = req.query;

  try {
    // Opciones de paginación
    const options = {
      limit: limit,
      page: page,
    };

    // filtrar los productos si se proporciona query
    const filter = {};

    if (query) {
      if (query.category) {
        filter.$or = [{ category: query.category }];
      }
      if (query.title) {
        filter.$or = [{ title: query.title }];
      }
      if (query.status) {
        filter.$or = filter.$or || [];
        filter.$or.push({ status: query.status });
      }

      // Filtrar por rango de precios
      if (minPrice && maxPrice) {
        filter.price = { $gte: minPrice, $lte: maxPrice };
      }
    }

    // Ordenar los productos si se proporciona sort
    const sortOptions = {};
    if (sort) {
      if (sort === 'asc') {
        sortOptions.price = 1;
      } else if (sort === 'desc') {
        sortOptions.price = -1;
      }
    }

    // Cargar los productos utilizando mongoose-paginate-v2
    const {
      docs,
      totalPages,
      prevPage,
      nextPage,
      hasNextPage,
      hasPrevPage,
    } = await getAllProductsPaginated(options, filter, sortOptions);

    //   Enlaces a pagina previa y siguiente
    const prevLink = hasPrevPage
      ? `/products?page=${prevPage}&limit=${limit}`
      : null;
    const nextLink = hasNextPage
      ? `/products?page=${nextPage}&limit=${limit}`
      : null;

    const response = {
      payload: docs,
      totalPages: totalPages,
      page: page,
      prevPage: prevPage,
      nextPage: nextPage,
      hasPrevPage: hasPrevPage,
      hasNextPage: hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
    };

    res.status(200).json({
      status: 'success',
      message: 'Paginated products',
      data: response,
    });
  } catch (error) {
    log.fatal(error);
        return res
          .status(500)
          .send({ status: 'error', message: 'Error de servidor' });
  }
};
