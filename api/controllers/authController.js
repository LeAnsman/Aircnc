import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
      if (err) throw err;
      const { email, firstname, lastname, id } = await User.findById(user.id);
      res.json({ email, firstname, lastname, id });
    });
  } else {
    res.json(null);
  }
};
