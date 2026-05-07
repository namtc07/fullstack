import { Request, Response } from "express";
import User from "@/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { env } from "@/config/env";

const ensureDbConnected = (res: Response): boolean => {
  if (mongoose.connection.readyState !== 1) {
    res.status(503).json({
      error: "Database chưa kết nối",
      hint: "Kiểm tra MongoDB Atlas Network Access (IP whitelist) rồi thử lại.",
    });
    return false;
  }

  return true;
};

// Promise<void> báo cho TypeScript biết hàm này là bất đồng bộ và không trả về trực tiếp giá trị nào (chỉ dùng res.json)
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  if (!ensureDbConnected(res)) return;

  try {
    const { name, role, password } = req.body;

    // Mã hóa mật khẩu với độ khó (salt) là 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, role, password: hashedPassword });
    await newUser.save(); // Lưu vào MongoDB

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi đăng ký" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  if (!ensureDbConnected(res)) return;

  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });

    // Xử lý nếu người dùng không tồn tại
    if (!user) {
      res.status(400).json({ error: "Không tìm thấy người dùng" });
      return; // Dừng hàm sớm
    }

    // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ error: "Mật khẩu không đúng" });
      return;
    }

    // Cấp thẻ JWT chứa ID và Role, hạn sử dụng 1 giờ
    const token = jwt.sign({ id: user._id, role: user.role }, env.jwtSecret, { expiresIn: "1h" });
    res.json({ message: "Đăng nhập thành công!", token });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi đăng nhập" });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  if (!ensureDbConnected(res)) return;

  try {
    const users = await User.find(); // Lấy toàn bộ dữ liệu
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
};
