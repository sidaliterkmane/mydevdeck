const express = require('express');
const router = express.Router();
const cors = require('cors');

const { loginUser, logoutUser, getProfile, changePassword } = require("../controllers/authController");

// middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.post('/login', loginUser)
router.get("/logout", logoutUser)
router.get('/profile', getProfile)
router.post('/change-password', changePassword)

module.exports = router