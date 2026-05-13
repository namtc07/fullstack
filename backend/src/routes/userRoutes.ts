import express from "express";
import { registerUser, loginUser, getUsers, uploadAvatar } from "@/controllers/userController";
import { verifyToken } from "@/middlewares/authMiddleware"; // Nhúng chốt chặn
import { isAdmin } from "@/middlewares/roleMiddleware";

import { upload } from "@/middlewares/uploadMiddleware";
import { registerSchema, validateData } from "@/middlewares/validateMiddleware";

const router = express.Router();

router.post("/upload-avatar", verifyToken, upload.single("avatar"), uploadAvatar);

// API công khai (ai cũng gọi được)
router.post("/register", validateData(registerSchema), registerUser);
    
router.post("/login", loginUser);

// API bảo mật (phải có token hợp lệ và role admin mới gọi được)
router.get("/", verifyToken, isAdmin, getUsers); 


export default router;
