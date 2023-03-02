import express from "express";
import jwt from "jsonwebtoken";
import Booking from "../models/Booking.js";
import {
  getBookings,
  createBooking,
  getSingleBooking,
} from "../controllers/bookingController.js";
const router = express.Router();

router.get("/", getBookings);
router.get("/:id", getSingleBooking);

router.post("/", createBooking);

export default router;
