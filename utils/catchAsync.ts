import { Request, Response } from "express";
import GlobalError from "./GlobalError";

const catchAsync = (fn) => {
  return (req: Request, res: Response, next: any) => {
    fn(req, res, next).catch((error) => {
      return next(error);
    });
  };
};
export default catchAsync;
