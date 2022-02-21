import { Request, Response } from "express";
import GlobalError from "../utils/GlobalError";
function sendError(error: GlobalError, res: Response) {
  error.result = false;
  res.status(error.statusCode).send({
    result: error.result,
    status: error.status,
    message: error.message,
  });
}
function handleValidationErrors(err: any) {
  let error = Object.values(err.errors).map((el: any) => {
    return el.message;
  });
  const message: string = `Validation error ${error.join(". ")} `;
  return new GlobalError(message, 401);
}
function handleCastErrors(err: GlobalError) {
  const message: string = `Invalid ${err.path} : ${err.value}`;
  return new GlobalError(message, 400);
}
function setError(err: GlobalError, req: Request, res: Response, next: any) {
  err.statusCode = err.statusCode || 500;
  err.result = false;
  err.status = err.status || "error";
  let errorToSend = { ...err };

  switch (err.name) {
    case "ValidationError":
      errorToSend = handleValidationErrors(errorToSend);
      break;
    case "CastError":
      errorToSend = handleCastErrors(errorToSend);
      break;
    default: {
      errorToSend.message = err.message;
      break;
    }
  }
  sendError(errorToSend, res);
}
export default setError;
