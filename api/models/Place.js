import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  photos: [{ type: String, required: true }],
  perks: [String],
  extraInfos: String,
  checkInTime: String,
  checkOutTime: String,
  maxGuests: { type: Number, required: true },
  price: { type: Number, required: true },
});

const PlaceModel = mongoose.model("Place", PlaceSchema);

export default PlaceModel;
