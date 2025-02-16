import fs from "fs";
import path from "path";
import Jimp from "jimp";
import { fileURLToPath } from "url";
import { User } from "../models/userModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const avatarsDir = path.join(__dirname, "../public/avatars");

export const updateAvatar = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File is required" });
  }

  const { path: tempPath, originalname } = req.file;
  const newFileName = `${req.user._id}-${Date.now()}-${originalname}`;
  const resultPath = path.join(avatarsDir, newFileName);

  try {
    const image = await Jimp.read(tempPath);
    await image.resize(250, 250).writeAsync(resultPath);
    fs.unlinkSync(tempPath);

    const avatarURL = `/avatars/${newFileName}`;
    req.user.avatarURL = avatarURL;
    await req.user.save();

    res.json({ avatarURL });
  } catch (error) {
    console.error("Error processing image:", error);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    res.status(500).json({ message: "Error processing image" });
  }
};
