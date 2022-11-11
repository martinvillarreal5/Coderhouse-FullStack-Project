import ProductRepository from "../data-access/repositories/product-repository.js";

export const getProductById = async (id) => {
  return await ProductRepository.getById(id);
};

export const getProductsByArrayOfIds = async (ids) => {
  return await ProductRepository.getByIds(ids);
};

export const getProducts = async () => {
  return await ProductRepository.getAll();
};

export const createProduct = async (data) => {
  return await ProductRepository.create(data);
};

export const updateProduct = async (id, data) => {
  return await ProductRepository.updateById(id, data);
};

export const deleteProduct = async (id) => {
  await ProductRepository.deleteById(id);
};
