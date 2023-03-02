import express from "express";
import {
  createPlace,
  getAllPlaces,
  getSinglePlace,
  updatePlace,
} from "../controllers/placeController.js";
const router = express.Router();

router.get("/", getAllPlaces);
router.get("/:id", getSinglePlace);
router.post("/", createPlace);
router.put("/", updatePlace);

export default router;
