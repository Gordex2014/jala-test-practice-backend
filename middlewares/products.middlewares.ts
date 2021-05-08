import { body, param } from "express-validator";
import { isAValidProduct } from "../helpers/dbValidators";
import { validateItemExistence, validateUserInput } from "./fieldValidators";

export const productCreation = [
  body("description", "Description has to be included").notEmpty(),
  validateUserInput,
  body("description", "Description has to be a string").isString(),
  validateUserInput,
  body("name", "Name has to be included").notEmpty(),
  validateUserInput,
  body("name", "Name has to a string").isString(),
  validateUserInput,
  body("price", "Price has to be included").notEmpty(),
  validateUserInput,
  body("price", "Price has to be a number").isNumeric(),
  validateUserInput,
  body("imageUrl", "ImageUrl has to be included").notEmpty(),
  validateUserInput,
  body("imageUrl", "ImageUrl has to be a valid url").isURL(),
  validateUserInput,
  body("typeOfFood", "Typeoffood has to be included").notEmpty(),
  validateUserInput,
  body("typeOfFood", "Typeoffood has to be string").isString(),
  validateUserInput,
];

export const rateAddition = [
  body("rate", "Rate should be included").notEmpty(),
  validateUserInput,
  body("rate", "Rate should be a number").isNumeric(),
  validateUserInput,
];

export const validProductValidation = [
  param("id", "Id must be a valid mongoId").isMongoId(),
  validateUserInput,
  param("id").custom(isAValidProduct),
  validateItemExistence,
];
