import mongoose from "mongoose";

// Interface định nghĩa kiểu dữ liệu chặt chẽ cho 1 người dùng trong TypeScript
interface IUser {
  name: string;
  role: string;
  password: string;
}

// Schema báo cho MongoDB biết cấu trúc bảng. Cú pháp <IUser> giúp ánh xạ Interface vào Schema.
const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true }, // required: true bắt buộc phải có trường này
  role: { type: String, required: true },
  password: { type: String, required: true },
});

// Xuất Model 'User' dựa trên Schema vừa tạo
const User = mongoose.model<IUser>("User", userSchema);

export default User;
