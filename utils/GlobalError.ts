class CustomError extends Error {
  status: string;
  statusCode: number;
  result: boolean;
  isOperational: boolean;
  path: string;
  value: string;
}
class GlobalError extends CustomError {
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
export default GlobalError;
