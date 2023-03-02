import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const bcryptSalt = await bcrypt.genSalt(10);

export const register = async (req, res) => {
  const { email, firstname, lastname, password } = req.body;
  try {
    const user = await User.create({
      email,
      firstname,
      lastname,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(422).json(err);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const passwordCrypted = bcrypt.compareSync(password, user.password);
      if (passwordCrypted) {
        jwt.sign(
          {
            email: user.email,
            id: user._id,
          },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("Password does not match.");
      }
    } else {
      res.status(400).json("Email not found.");
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "").json(true);
};
