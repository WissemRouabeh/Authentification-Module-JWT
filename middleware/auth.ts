import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

dotenv.config();
const { TOKEN_KEY } = process.env;

interface CustomRequest extends Request {
  user: any;
}

function testMiddleware(req: Request, res: Response, next: any) {
  if (req.body.username !== "") return next();
  else res.status(400).send("error");
}
// function verifyToken(req: CustomRequest, res: Response, next: any) {
//   const user: user = req.body;

//   if (!user.token) {
//     return res.status(403).send("Token is required");
//   }

//   try {
//     const decoded = jwt.verify(user.token, TOKEN_KEY);
//     req.user = decoded.username;
//   } catch (err) {
//     return res.status(401).send({ access: false, message: "Access denied" });
//   }
//   return next();
// }

function verifyToken(req: CustomRequest, res: Response, next: any) {
  const authHeader: string = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send("Token is required");
  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded.user;
  } catch (err: any) {
    return res.status(401).send({ access: false, message: "Access denied" });
  }
  return next();
}
export { verifyToken, testMiddleware };
