"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMiddleware = exports.verifyToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { TOKEN_KEY } = process.env;
function testMiddleware(req, res, next) {
    if (req.body.username !== "")
        return next();
    else
        res.status(400).send("error");
}
exports.testMiddleware = testMiddleware;
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
function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.status(401).send("Token is required");
    try {
        const decoded = jsonwebtoken_1.default.verify(token, TOKEN_KEY);
        req.user = decoded.user;
    }
    catch (err) {
        return res.status(401).send({ access: false, message: "Access denied" });
    }
    return next();
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.js.map