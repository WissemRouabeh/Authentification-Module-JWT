"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const { TOKEN_KEY } = process.env;
function verifyToken(req, res, next) {
    const user = req.body;
    if (!user.token) {
        return res.status(403).send("Token is required");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(user.token, TOKEN_KEY);
        req.user = decoded.username;
    }
    catch (err) {
        return res.status(401).send("Wrong token");
    }
    return next();
}
exports.default = verifyToken;
//# sourceMappingURL=auth.js.map