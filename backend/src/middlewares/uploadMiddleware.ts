import multer from "multer";
import fs from "fs";

// Tự động tạo thư mục uploads nếu nó chưa tồn tại
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Chỉ định nơi lưu file
  },
  filename: (req, file, cb) => {
    // Đổi tên file: ghép mốc thời gian hiện tại với tên gốc để tránh trùng lặp
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
