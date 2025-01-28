import express from "express";
import cors from "cors";
import logger from "morgan";
import contactsRouter from "./routes/contactsRoutes.js";
import { errorHandler } from "./utils/errorHandler.js";

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

export default app;
