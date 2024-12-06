"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRouter_js_1 = __importDefault(require("./router/userRouter.js"));
const errorHanler_1 = require("./middleware/errorHanler");
const localHostURl = process.env.localhostUR;
const liveURL = process.env.liveURL;
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 4000;
app.use(express_1.default.json({ limit: '20mb' }));
app.use(express_1.default.urlencoded({ limit: '20mb', extended: true }));
const corsOptions = {
    origin: [localHostURl, liveURL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use('/', userRouter_js_1.default);
app.use('*', errorHanler_1.notFound);
app.use(errorHanler_1.errorHandle);
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
