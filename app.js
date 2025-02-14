import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import logger from "morgan";
import authRoutes from "./routes/authRoutes.js";
import contactsRoutes from "./routes/contactsRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use("/avatars", express.static(path.join(__dirname, "public/avatars")));
app.use(logger("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/users", authRoutes);
app.use("/api/contacts", contactsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

export default app;
