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
const token_1 = __importDefault(require("../models/token"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = express_1.default.Router();
router.route("/push/:id").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.body;
    token._id = new mongoose_1.default.Types.ObjectId();
    token.userId = req.params.id;
    yield new token_1.default(token).save().then((value) => {
        res.status(201).send(value);
    });
}));
exports.default = router;
//# sourceMappingURL=token.js.map