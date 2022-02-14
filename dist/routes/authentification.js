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
const token_1 = __importDefault(require("../models/token"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
dotenv_1.default.config();
const router = express_1.default.Router();
function generateAccessToken(payload) {
    return jsonwebtoken_1.default.sign({
        user: payload,
    }, process.env.TOKEN_KEY, { expiresIn: "30s" });
}
function generateRefreshToken(payload) {
    return jsonwebtoken_1.default.sign({ username: payload }, process.env.Refresh_TOKEN_KEY);
}
router.route("/token/:userid").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const findRefreshToken = yield token_1.default.findOne({
        userId: req.params.userid,
    });
    if (!findRefreshToken) {
        res.status(403).send("Refresh token not found");
    }
    else {
        jsonwebtoken_1.default.verify(findRefreshToken.refreshToken, process.env.REFRESH_TOKEN_KEY, (err, data) => {
            if (err)
                return res.sendStatus(403);
            const accessToken = generateAccessToken(data.username);
            res.status(200).send({ accessToken: accessToken });
        });
    }
}));
router.route("/login").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const userExist = yield user_1.default.findOne({ username: user.username });
    if (userExist) {
        bcryptjs_1.default
            .compare(user.password, userExist.password)
            .then(function (result) {
            if (result) {
                const accessToken = generateAccessToken(userExist.username);
                const refreshToken = generateRefreshToken(userExist.username);
                new token_1.default({
                    _id: new mongoose_1.default.Types.ObjectId(),
                    userId: userExist._id,
                    refreshToken: refreshToken,
                })
                    .save()
                    .then((data) => console.log({ saved: true, message: "Refresh token saved", data }));
                res
                    .header("authorization", "Bearer " + accessToken)
                    .send({ userExist, accessToken, refreshToken });
            }
            else {
                res.status(204).send("incorrect password");
            }
        });
    }
}));
router.route("/logout/:userid").delete((req, res) => {
    token_1.default.findOneAndDelete({ userid: req.params.userid });
    res.status(204).send("Refresh token deleted, logged out");
});
exports.default = router;
//# sourceMappingURL=authentification.js.map