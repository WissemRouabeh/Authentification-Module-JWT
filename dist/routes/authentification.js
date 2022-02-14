"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const router = express_1.default.Router();
router.route("/login").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const userExist = yield user_1.default.findOne({ username: user.username });
    if (userExist && userExist.password == user.password) {
        const token = jsonwebtoken_1.default.sign({
            username: userExist.username,
        }, process.env.TOKEN_KEY, { expiresIn: "2h" });
        user.token = token;
        res.header("x-access-token", token).send(user);
    }
}));
//# sourceMappingURL=authentification.js.map