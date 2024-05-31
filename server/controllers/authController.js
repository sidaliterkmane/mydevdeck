const User = require("../models/user");
const { hashPassword, comparePasswords } = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user was found under this email.",
      });
    }

    // Check if passwords match
    const match = await comparePasswords(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.json({
        error: "Incorrect password. Please try again.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// Logout endpoint
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    message:
      "Logged out successfully. You will be redirected to the login page.",
  });
};

const getProfile = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  loginUser,
  logoutUser,
  getProfile,
};
