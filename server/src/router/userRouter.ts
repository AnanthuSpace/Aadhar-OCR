import { Router } from "express";
import multer from "multer";
import { UserController } from "../controller/userController";
import { UserService } from "../service/userService";

const router = Router();

const userService = new UserService();
const userController = new UserController(userService);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload-file", upload.fields([
  { name: "frontpage", maxCount: 1 },
  { name: "backpage", maxCount: 1 }
]), (req, res) => userController.parseAadhar(req as any, res));

export default router;
