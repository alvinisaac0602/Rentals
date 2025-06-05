import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [], // <-- plural here
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 1,
    discountedPrice: 1,
    parking: false,
    furnished: false,
    offer: false,
  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = `${Date.now()}-${file.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
        }
      );
    });
  };

  const handleImageSubmit = async () => {
    if (files.length === 0) {
      return setImageUploadError("Please select images to upload.");
    }
    if (formData.imageUrls.length + files.length > 6) {
      return setImageUploadError("You can only upload up to 6 images.");
    }

    setUploading(true);
    setImageUploadError(false);

    try {
      const url = await Promise.all(files.map((file) => storeImage(file)));
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, ...url], // plural here
      }));
      setFiles([]);
    } catch (err) {
      console.error("Upload failed:", err);
      setImageUploadError("Image upload failed. Ensure images are <2MB.");
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (id === "sale" || id === "rent") {
      setFormData((prev) => ({ ...prev, type: id }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [id]: checked }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [id]: type === "number" ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.imageUrls.length === 0) {
      return setError("Please upload at least one image.");
    }
    if (formData.offer && formData.discountedPrice >= formData.regularPrice) {
      return setError("Discounted price must be less than regular price.");
    }
    if (!currentUser || !currentUser._id) {
      return setError("User not logged in or userRef is missing.");
    }

    try {
      setLoading(true);
      setError(false);

      const listingData = {
        ...formData,
        userRef: currentUser._id,
      };

      console.log("Submitting listing:", listingData);

      const res = await fetch("http://localhost:3000/api/listing/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(listingData),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.message || "Failed to create listing");
      }

      navigate(`/listing/${data._id}`);
    } catch (err) {
      setLoading(false);
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg"
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg"
          />
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                id="sale"
                name="type"
                checked={formData.type === "sale"}
                onChange={handleChange}
              />
              Sale
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                id="rent"
                name="type"
                checked={formData.type === "rent"}
                onChange={handleChange}
              />
              Rent
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                checked={formData.parking}
                onChange={handleChange}
              />
              Parking Spot
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                checked={formData.furnished}
                onChange={handleChange}
              />
              Furnished
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={formData.offer}
                onChange={handleChange}
              />
              Offer
            </label>
          </div>

          <div className="flex flex-wrap gap-6">
            <label className="flex flex-col">
              Bedrooms
              <input
                type="number"
                id="bedrooms"
                min="1"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg"
              />
            </label>
            <label className="flex flex-col">
              Bathrooms
              <input
                type="number"
                id="bathrooms"
                min="1"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg"
              />
            </label>
            <label className="flex flex-col">
              Regular Price
              <input
                type="number"
                id="regularPrice"
                min="1"
                value={formData.regularPrice}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg"
              />
            </label>
            <label className="flex flex-col">
              Discounted Price
              <input
                type="number"
                id="discountedPrice"
                min="1"
                value={formData.discountedPrice}
                onChange={handleChange}
                required
                className="p-3 border rounded-lg"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:{" "}
            <span className="text-gray-600 font-normal">
              The first image will be the cover (max 6)
            </span>
          </p>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files))}
            className="p-3 border rounded-lg"
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            disabled={uploading}
            className="p-3 border border-green-700 text-green-700 rounded-lg"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          {imageUploadError && (
            <p className="text-red-500 text-sm">{imageUploadError}</p>
          )}

          {formData.imageUrls.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {formData.imageUrls.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`uploaded ${index}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-600 text-sm hover:underline block mt-1 text-center"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-lg"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
