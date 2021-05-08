import { Response } from "express";

export const success = (
  res: Response,
  message: string | object,
  status: number
) => {
  res.status(status || 200).json({
    error: "",
    body: message,
  });
};

export const clientError = (res: Response, message: string, status: number) => {
  res.status(status || 400).json({
    error: message,
    body: "",
  });
};

export const error = (
  res: Response,
  message: string,
  status: number,
  details: any
) => {
  console.log(`${"[Error response]:".red} ${details}`);
  res.status(status || 500).json({
    error: message,
    body: "",
  });
};
