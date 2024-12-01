import { Router } from "express";
import parseAadhar from "../controller/userController.js";
import multer from "multer";

const userRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

userRouter.post("/upload-file", upload.fields([{ name: "frontpage", maxCount: 1 }, { name: "backpage", maxCount: 1 }]), parseAadhar);

export default userRouter;
