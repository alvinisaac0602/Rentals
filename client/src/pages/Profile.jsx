import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice";
import Listing from "../../../api/models/listing.model";

const Profile = () => {
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();
  const { currentUser, error } = useSelector((state) => state.user);

  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 2 * 1024 * 1024) {
      setFileUploadError(true);
      setFilePerc(0);
      return;
    }
    setFileUploadError(false);
    setFile(selectedFile);
  };

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({
            ...prev,
            avatar: downloadURL,
          }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUpdateSuccess(false);
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        credentials: "include", // Include cookies for session management
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      setLoading(false);
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      // ✅ Correct filtering here
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.error("Failed to delete listing:", error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleFileInput}
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="w-24 h-24 rounded-full mx-auto mt-4 object-cover cursor-pointer self-center"
        />

        {fileUploadError && (
          <p className="text-center text-sm text-red-500">
            Error uploading file (Image must be less than 2MB).
          </p>
        )}

        {filePerc > 0 && filePerc < 100 && !fileUploadError && (
          <p className="text-center text-sm text-green-500">
            File is uploading... {filePerc}%
          </p>
        )}

        {filePerc === 100 && !fileUploadError && (
          <p className="text-center text-sm text-green-500">
            File uploaded successfully!
          </p>
        )}

        <input
          type="text"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg mt-4"
        />
        <input
          type="text"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg mt-4"
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          className="p-3 border border-gray-300 rounded-lg mt-4"
        />
        <button
          disabled={loading}
          className="bg-blue-700 uppercase text-white p-3 rounded-lg mt-4 hover:bg-blue-600 transition-colors duration-300 cursor-pointer disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
        <Link
          className="bg-green-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95 cursor-pointer"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>

      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

      {updateSuccess && (
        <p className="text-green-500 text-center mt-2">
          Profile updated successfully!
        </p>
      )}

      <div className="flex justify-between items-center mt-6">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer uppercase"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 cursor-pointer uppercase"
        >
          Sign Out
        </span>
      </div>

      <button
        onClick={handleShowListings}
        className="text-green-600 mt-4 cursor-pointer"
      >
        Show listings
      </button>
      <p className="text-red-700">
        {showListingError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
          {userListings.map((listing) => (
            <div key={listing._id} className="mb-4 p-4 ">
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="w-full h-50 object-cover mb-2"
                />
              </Link>
              <Link to={`/listing/${listing._id}`}>
                <p className="text-lg font-medium">{listing.name}</p>
              </Link>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-blue-700 uppercase cursor-pointer">
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
