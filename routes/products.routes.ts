import { Router } from "express";

import {
  addRate,
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/products.controllers";
import {
  productCreation,
  rateAddition,
  validProductValidation,
} from "../middlewares/products.middlewares";

const router = Router();

router.get("/", getProducts);

router.get("/:id", validProductValidation, getProductById);

router.post("/", productCreation, createProduct);

router.patch("/:id/rate", validProductValidation, rateAddition, addRate);

export default router;
