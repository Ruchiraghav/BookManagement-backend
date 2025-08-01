
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Import your routes
import userRoutes from "./routes/userRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

// Create the ONE and ONLY Express app instance
const app = express();

// Apply middleware
app.use(cors({
  origin: "http://localhost:5173", // Your frontend's origin
  credentials: true
}));
app.use(cookieParser());
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // For URL-encoded data if needed
app.use(express.static("public")); // To serve static files (e.g., images)

// Define your API routes
app.use("/api/genres", genreRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/users", userRoutes);
app.use("/api/memberships", membershipRoutes);
app.use("/api/reviews", reviewRoutes);

// Basic test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Export the configured app instance
export default app;

