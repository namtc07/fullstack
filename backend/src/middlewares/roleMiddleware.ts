import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // Thông tin user đã được authMiddleware giải mã từ token trước đó
  const user = (req as any).user;

  if (user && user.role === "admin") {
    next(); // Là admin -> Cho phép đi tiếp vào controller
  } else {
    res.status(403).json({ message: "Bị cấm: Chỉ Admin mới có quyền truy cập!" });
  }
};
