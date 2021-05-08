import { CustomValidator } from "express-validator";

export const isBetweenZeroAndFive: CustomValidator = (rate: number) => {
  if (rate <= 5 && rate >= 0) {
    return true;
  } else {
    throw new Error(`Rate value should be between 0 and 5`);
  }
};
