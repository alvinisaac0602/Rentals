import express from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getUserListings,
  getListing,
  getListings,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/user-listings/:id", verifyToken, getUserListings);
router.get("/get/:id", getListing); // <-- This one is key
router.get("/get", getListings);

export default router;
