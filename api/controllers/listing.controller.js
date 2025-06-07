// controllers/listing.controller.js
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res) => {
  try {
    if (!req.body.userRef) {
      return res
        .status(400)
        .json({ success: false, message: "userRef is required" });
    }
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res
        .status(400)
        .json({ success: false, message: messages.join(", ") });
    }
    console.error("Server error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"));
    if (req.user.id !== listing.userRef.toString())
      return next(errorHandler(403, "You can delete only your listings"));

    await Listing.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Listing has been deleted" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"));
    if (req.user.id !== listing.userRef.toString())
      return next(errorHandler(403, "You can only update your own listings"));

    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings"));
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(errorHandler(404, "Listing not found"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const query = {};

    // Text search on name
    if (req.query.searchTerm) {
      query.name = { $regex: req.query.searchTerm, $options: "i" };
    }

    // Type filter
    if (req.query.type && req.query.type !== "all") {
      query.type = req.query.type;
    }

    // Boolean filters
    if (req.query.offer === "true") {
      query.offer = true;
    }

    if (req.query.furnished === "true") {
      query.furnished = true;
    }

    if (req.query.parking === "true") {
      query.parking = true;
    }

    // Sort field & order
    const sortField = req.query.sort || "createdAt";
    const sortOrder = req.query.order === "asc" ? 1 : -1;

    const listings = await Listing.find(query)
      .sort({ [sortField]: sortOrder })
      .skip(startIndex)
      .limit(limit);

    res.status(200).json(listings);
  } catch (error) {
    console.error("getListings error:", error);
    next(error);
  }
};
