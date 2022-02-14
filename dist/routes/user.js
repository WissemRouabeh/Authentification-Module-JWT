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
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("../middleware/auth"));
dotenv_1.default.config();
const router = express_1.default.Router();
// interface CustomRequest extends Request {
//   user: string;
// }
router.route("/register").post((req, res, next) => {
    if (req.body.username == "wissem")
        return next();
    else
        res.status(400).send("error");
}, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
    });
    yield user
        .save()
        .then((data) => {
        res.status(201).send({ result: "ok", data });
    })
        .catch((error) => {
        console.log(error);
    });
}));
//test api
router.route("/welcome").post(auth_1.default, (req, res) => {
    console.log();
});
exports.default = router;
//# sourceMappingURL=user.js.map