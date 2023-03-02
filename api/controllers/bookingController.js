import jwt from "jsonwebtoken";
import Booking from "../models/Booking.js";

export const getBookings = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    const { id } = user;
    res.status(200).json(await Booking.find({ user: id }).populate("place"));
  });
};

export const getSingleBooking = async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await Booking.findById(id).populate("place"));
};

export const createBooking = async (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      const { id } = user;
      const {
        place,
        checkIn,
        checkOut,
        guestsNumber,
        fullname,
        phoneNumber,
        price,
      } = req.body;
      const booking = await Booking.create({
        place,
        user: id,
        checkIn,
        checkOut,
        guestsNumber,
        fullname,
        phoneNumber,
        price,
      });
      res.status(201).json(booking);
    });
  } catch (err) {
    res.status(422).json(err);
  }
};
