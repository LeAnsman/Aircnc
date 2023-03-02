import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  firstname: String,
  lastname: String,
  password: String,
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
