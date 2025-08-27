import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, sparse: true, unique: true },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  username: { type: String, unique: true },
  resetToken: { type: String },
  resetExpires: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  smsResetCode: { type: String },
  smsResetCodeExpires: { type: Date },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
