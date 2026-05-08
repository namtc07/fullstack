import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";
import { prisma } from "@/lib/prisma";

// Promise<void> báo cho TypeScript biết hàm này là bất đồng bộ và không trả về trực tiếp giá trị nào (chỉ dùng res.json)
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, role, password } = req.body;

    const existedUser = await prisma.user.findUnique({ where: { name } });
    if (existedUser) {
      res.status(400).json({ error: "Tên người dùng đã tồn tại" });
      return;
    }

    // Mã hóa mật khẩu với độ khó (salt) là 10
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        role: role || "user",
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi đăng ký" });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;
    const user = await prisma.user.findUnique({ where: { name } });

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
    const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: "1h" });
    res.json({ message: "Đăng nhập thành công!", token });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi đăng nhập" });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        role: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy dữ liệu" });
  }
};

export const uploadAvatar = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ error: "Vui lòng chọn một file ảnh!" });
    return;
  }
  // Trả về đường dẫn của file vừa upload
  res.json({ message: "Upload thành công!", fileUrl: `/uploads/${req.file.filename}` });
};