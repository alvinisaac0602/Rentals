import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getUserListings,
  getListing,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.put("/update/:id", verifyToken, updateListing);
router.get("/user-listings/:id", verifyToken, getUserListings);
router.get("/get/:id", getListing); // <-- This one is key

export default router;
