"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var userController_1 = require("../controller/userController");
var userService_1 = require("../service/userService");
var router = (0, express_1.Router)();
var userService = new userService_1.UserService();
var userController = new userController_1.UserController(userService);
var storage = multer_1.default.memoryStorage();
var upload = (0, multer_1.default)({ storage: storage });
router.post("/upload-file", upload.fields([{ name: "frontpage", maxCount: 1 }, { name: "backpage", maxCount: 1 },]), function (req, res) { return userController.parseAadhar(req, res); });
exports.default = router;
