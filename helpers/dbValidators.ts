import { CustomValidator } from "express-validator";

import { Product } from "../models/products.models";

export const isAValidProduct: CustomValidator = async (id: string, { req }) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error(`Product with id ${id} couldn't be found`);
  }
  req.product = product;
  return true;
};
