"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const token_1 = __importDefault(require("./routes/token"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { MONGO_URI, PORT } = process.env;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default.connect(MONGO_URI, () => {
    console.log("Connected");
});
app.use("/api/user/", user_1.default);
app.use("/api/token/", token_1.default);
server.listen(PORT, () => {
    console.log("Listening on " + PORT);
});
//# sourceMappingURL=app.js.map