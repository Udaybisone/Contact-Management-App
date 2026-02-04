import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// Security
app.use(helmet());

// Logs
app.use(morgan("dev"));

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);

// Error middleware (ALWAYS LAST)
app.use(errorMiddleware);

export default app;
