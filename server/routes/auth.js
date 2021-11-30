const express = require("express");
const router = express.Router();
const User = require("../models/user");

const {
  createRegister,
  login,
  currentUser,
} = require("../controllers/auth.controller");

// import middleware
const { auth, adminCheck } = require("../middleware/auth.middleware");

// @route       POST localhost:8000/api/register
// @desc        route resgister
// @accress     Public
router.post("/register", createRegister);

// @route       POST localhost:8000/api/login
// @desc        route login
// @accress     Public
router.post("/login", login);

// @route       POST localhost:8000/api/current-user
// @desc        route current-user
// @accress     Private
router.post("/current-user", auth, currentUser);

// @route       POST localhost:8000/api/current-admin
// @desc        route current-admin
// @accress     Private
router.post("/current-admin", auth, adminCheck, currentUser);

module.exports = router;
