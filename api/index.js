import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // ✅ Import cors

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Err:" + err));

const app = express();

// ✅ Enable CORS for frontend origin
app.use(
  cors({
    origin: "http://localhost:5173", // or "*" for all origins
    credentials: true, // allows cookies and Authorization headers
  })
);

app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// ✅ Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message,
  });
});

// ✅ Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
