import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// SIGNUP
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json("User created successfully.");
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern?.username) {
        return res.status(400).json("Username already exists.");
      }
      if (error.keyPattern?.email) {
        return res.status(400).json("Email already exists.");
      }
      return res.status(400).json("Duplicate field value.");
    }

    next(error); // pass other errors to error handler middleware
  }
};

// SIGNIN
export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found.");

    const isPasswordCorrect = bcryptjs.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return res.status(401).json("Wrong password.");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    const { password, ...rest } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

// GOOGLE AUTH
export const google = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password, ...rest } = existingUser._doc;
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.replace(/\s+/g, "").toLowerCase() +
          Math.random().toString(36).slice(-5),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photoURL,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      const { password, ...rest } = newUser._doc;

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

// SIGNOUT (Fixed)
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json("User has been logged out.");
  } catch (error) {
    next(error);
  }
};
