import express from "express";
import cors from "cors";
import logger from "morgan";
import authRoutes from "./routes/authRoutes.js";
import contactsRoutes from "./routes/contactsRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();
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
