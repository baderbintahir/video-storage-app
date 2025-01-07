const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { verifyToken } = require('../middlewares/authMiddleware');

// Get all users
router.get("/", verifyToken, userController.getAllUsers);

// Get a user by ID
router.get("/:id", verifyToken, userController.getUserById);

// Update a user by ID
router.put("/:id", verifyToken, userController.updateUserById);

// Delete a user by ID
router.delete("/:id", verifyToken, userController.deleteUserById);
