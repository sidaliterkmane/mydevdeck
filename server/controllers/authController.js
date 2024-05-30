const User = require("../models/user");
const { hashPassword, comparePasswords } = require("../helpers/authHelper");
const jwt = require("jsonwebtoken");

// Login Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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
        { email: user.email, id: user._id, name: user.name },
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
  res
    .clearCookie("token")
    .json({
      message:
        "Logged out successfully. You will be redirected to the login page.",
    });
};

module.exports = {
  loginUser,
};
