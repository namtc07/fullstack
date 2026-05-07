import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/config/env";

// Mở rộng kiểu dữ liệu Request của Express để chứa thêm thông tin user
export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Client sẽ gửi token trên Header với định dạng "Bearer <token_chuoi_dai>"
  // Cắt chuỗi Header thành mảng các phần tử
  const parts = req.header("Authorization")?.split(" ");

  // Kiểm tra 3 điều kiện: Có gửi Header không? Có đúng 2 phần không? Phần đầu có đúng là chữ "Bearer" không?
  if (!parts || parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({ error: "Từ chối truy cập! Định dạng token không hợp lệ." });
    return;
  }

  // Nếu qua được chốt kiểm tra trên, lấy token ở vị trí số 1 một cách an toàn
  const token = parts[1];

  if (!token) {
    res.status(401).json({ error: "Từ chối truy cập! Không tìm thấy token." });
    return;
  }

  try {
    // Giải mã và xác thực token bằng secret từ biến môi trường
    const verified = jwt.verify(token, env.jwtSecret);
    req.user = verified;
    next(); // Token hợp lệ, cho phép đi tiếp vào hàm xử lý API (Controller)
  } catch (error) {
    res.status(403).json({ error: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};
