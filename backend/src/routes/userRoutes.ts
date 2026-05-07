import express from "express";
import { registerUser, loginUser, getUsers } from "@/controllers/userController";
import { verifyToken } from "@/middlewares/authMiddleware"; // Nhúng chốt chặn

const router = express.Router();

// API công khai (ai cũng gọi được)
router.post("/register", registerUser);
router.post("/login", loginUser);

// API bảo mật (phải có thẻ Token mới được vào)
router.get("/", verifyToken, getUsers);

export default router;
