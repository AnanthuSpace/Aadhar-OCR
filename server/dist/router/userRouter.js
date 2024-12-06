"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const userController_1 = require("../controller/userController");
const userService_1 = require("../service/userService");
const router = (0, express_1.Router)();
const userService = new userService_1.UserService();
const userController = new userController_1.UserController(userService);
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.post("/upload-file", upload.fields([{ name: "frontpage", maxCount: 1 }, { name: "backpage", maxCount: 1 },]), (req, res) => userController.parseAadhar(req, res));
exports.default = router;
