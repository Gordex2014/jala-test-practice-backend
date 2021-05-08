import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";
import { clientError } from "../network/response";

export const validateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorsArray = validationResult(req);
  const potentialError = errorsArray.array();
  if (potentialError.length !== 0) {
    const errorMessage = potentialError[0].msg;
    return clientError(res, errorMessage, 400);
  }
  next();
};

export const validateItemExistence = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorsArray = validationResult(req);
  const potentialError = errorsArray.array();
  if (potentialError.length !== 0) {
    const errorMessage = potentialError[0].msg;
    return clientError(res, errorMessage, 404);
  }
  next();
};
