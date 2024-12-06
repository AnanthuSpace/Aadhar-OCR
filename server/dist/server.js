"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var userRouter_js_1 = __importDefault(require("./router/userRouter.js"));
var errorHanler_1 = require("./middleware/errorHanler");
var localHostURl = process.env.localhostUR;
var liveURL = process.env.liveURL;
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = Number(process.env.PORT) || 4000;
app.use(express_1.default.json({ limit: '20mb' }));
app.use(express_1.default.urlencoded({ limit: '20mb', extended: true }));
var corsOptions = {
    origin: [localHostURl, liveURL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use((0, cors_1.default)(corsOptions));
app.use('/', userRouter_js_1.default);
app.use('*', errorHanler_1.notFound);
app.use(errorHanler_1.errorHandle);
app.listen(port, function () {
    console.log("Server started at port ".concat(port));
});
