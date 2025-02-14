import { User } from "../models/userModel.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

export const signup = async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "Email in use" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
  const user = await User.create({
    email,
    password: hashedPassword,
    avatarURL,
  });

  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Email or password is wrong" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.token = token;
  await user.save();

  res.json({ token, email: user.email, subscription: user.subscription });
};

export const logout = async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.status(200).json({ message: "User successfully logged out" });
};

export const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const validSubscriptions = ["starter", "pro", "business"];

  if (!validSubscriptions.includes(subscription)) {
    return res.status(400).json({ message: "Invalid subscription type" });
  }

  req.user.subscription = subscription;
  await req.user.save();

  res.json({ message: "Subscription updated successfully", subscription });
};
export const getCurrentUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }

  res.json({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};
