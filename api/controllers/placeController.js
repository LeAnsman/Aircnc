import Place from "../models/Place.js";
import jwt from "jsonwebtoken";

export const getAllPlaces = async (req, res) => {
  try {
    res.status(200).json(await Place.find());
  } catch (err) {
    res.status(404).json(err);
    console.log(err);
  }
};

export const getSinglePlace = async (req, res) => {
  const { id } = req.params;
  res.status(200).json(await Place.findById(id));
};

export const createPlace = async (req, res) => {
  try {
    const { token } = req.cookies;
    const {
      title,
      address,
      description,
      photos,
      perks,
      extraInfos,
      checkInTime,
      checkOutTime,
      maxGuests,
      price,
    } = req.body;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      const place = await Place.create({
        owner: user.id,
        title,
        address,
        description,
        photos,
        perks,
        extraInfos,
        checkInTime,
        checkOutTime,
        maxGuests,
        price,
      });
      res.status(201).json(place);
    });
  } catch (err) {
    res.status(422).json(err);
  }
};

export const updatePlace = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    description,
    photos,
    perks,
    extraInfos,
    checkInTime,
    checkOutTime,
    maxGuests,
    price,
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    const place = await Place.findById(id);
    if (user.id === place.owner.toString()) {
      place.set({
        title,
        address,
        description,
        photos,
        perks,
        extraInfos,
        checkInTime,
        checkOutTime,
        maxGuests,
        price,
      });
      await place.save();
      res.status(200).json(place);
    }
  });
};

export const getUserPlaces = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
    const { id } = user;
    res.status(200).json(await Place.find({ owner: id }));
  });
};
