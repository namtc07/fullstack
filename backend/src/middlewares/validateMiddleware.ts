import { Request, Response, NextFunction } from "express";
import { z } from "zod";

// 1. Tạo bộ luật (Schema) cho đăng ký
export const registerSchema = z.object({
  name: z.string().min(6, "Tên phải có ít nhất 6 ký tự"),
  //   email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải từ 6 ký tự trở lên"),
});

// 2. Middleware dùng để kiểm tra dữ liệu gửi lên
export const validateData = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body); // Kiểm tra dữ liệu trong body
      next(); // Hợp lệ -> cho phép đi tiếp vào Controller
    } catch (error: any) {
      res.status(400).json({ error: error.errors }); // Không hợp lệ -> Báo lỗi 400 ngay lập tức
    }
  };
};
