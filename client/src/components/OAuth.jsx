import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { SignInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch(); // ✅ Correct: declared at top-level of component
  const navigate = useNavigate(); // ✅ Correct

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        }),
      });

      const data = await res.json();

      dispatch(SignInSuccess(data));
      navigate("/");
    } catch (error) {
      console.error("Google OAuth error:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-500 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer"
    >
      Continue with Google
    </button>
  );
};

export default OAuth;
