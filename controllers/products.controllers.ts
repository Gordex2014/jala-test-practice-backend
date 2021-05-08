import { Request, Response } from "express";
import _ from "lodash";

import { IProduct, Product } from "../models/products.models";
import { error, success } from "../network/response";
import { RatePetition } from "../types/petitions/rates";

type AllowedSearchCriteria = {
  description: string;
  name: string;
  typeOfFood: string;
};

export const getProducts = async (req: Request, res: Response) => {
  const { description, name, typeOfFood } = req.query as AllowedSearchCriteria;
  const partialResult: IProduct[] = [];

  try {
    if (description) {
      const productsPerDescription = await Product.find({
        description: {
          $regex: description,
          $options: "i",
        },
      });
      Array.prototype.push.apply(partialResult, productsPerDescription);
    }
    if (name) {
      const productsPerName = await Product.find({
        name: {
          $regex: name,
          $options: "i",
        },
      });
      Array.prototype.push.apply(partialResult, productsPerName);
    }
    if (typeOfFood) {
      const productsPerTypeOfFood = await Product.find({
        typeOfFood: {
          $regex: typeOfFood,
          $options: "i",
        },
      });
      Array.prototype.push.apply(partialResult, productsPerTypeOfFood);
    }
    if (!description && !name && !typeOfFood) {
      const products = await Product.find();
      Array.prototype.push.apply(partialResult, products);
    }
    const finalResult = _.uniqBy(partialResult, "name");
    success(res, finalResult, 200);
  } catch (err) {
    error(res, "Please contact with an admin", 500, err);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const product = req.product as IProduct;
  success(res, product as object, 200);
};

export const createProduct = async (req: Request, res: Response) => {
  const {
    __v,
    _id,
    rates,
    ratesAverage,
    ratesCounter,
    ...data
  } = req.body as IProduct;

  const product = new Product(data);
  console.log(data.typeOfFood);
  try {
    await product.save();
    success(res, product, 200);
  } catch (err) {
    error(res, "Please contact with an admin", 500, err);
  }
};

export const addRate = async (req: Request, res: Response) => {
  const { rate } = req.body as RatePetition;
  const { id } = req.params;
  const { rates, ratesCounter } = req.product as IProduct;

  const newRates = rates!.concat(rate);
  const newRatesCounter = ratesCounter! + 1;
  let totalRatesSum = 0;
  newRates!.forEach((rateElement) => {
    totalRatesSum = totalRatesSum + rateElement;
  });
  const newRatesAverage = totalRatesSum / newRatesCounter;
  try {
    await Product.findByIdAndUpdate(id, {
      rates: newRates,
      ratesAverage: newRatesAverage,
      ratesCounter: newRatesCounter,
    });
    success(res, "Rates uploaded correctly", 204);
  } catch (err) {
    error(res, "Please contact with an admin", 500, err);
  }
};
