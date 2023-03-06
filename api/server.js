import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import * as url from "url";
import userRoutes from "./routes/user.js";
import placeRoutes from "./routes/places.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import bookingsRoutes from "./routes/bookings.js";
import { getUserPlaces } from "./controllers/placeController.js";

// creating dirname
export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const PORT = 4000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: ["https://aircnc-seven.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

mongoose.set("strictQuery", true);
try {
  mongoose.connect(process.env.MONGO_URL);
} catch (err) {
  console.log(err);
}

app.use("/", userRoutes);
app.use("/", uploadRoutes);
app.use("/places", placeRoutes);
app.use("/profile", authRoutes);
app.get("/places-user", getUserPlaces);
app.use("/bookings", bookingsRoutes);

app.listen(PORT, console.log(`Listening on http://localhost:${PORT}`));
