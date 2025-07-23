import { loadEnv } from "./config/loadEnv.js";
loadEnv();
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import notesRoutes from "./routes/notesRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS (Frontend origin allowed)
app.use(cors({
  origin: "http://localhost:5173", // or "*" if testing only
}));

// Body parser
app.use(express.json());

// Rate limiter
app.use(rateLimiter);

// Routes
app.use("/api/auth", authRoutes); // ✅ Login
app.use("/api/notes", notesRoutes); // ✅ Notes (protected)

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
  });
});
