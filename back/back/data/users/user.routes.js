const express = require("express");
const router = express.Router();

const {
  
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  userRegister,
  userLogin,
} = require("./user.controller");


const Token = require("../../middlewares/jwt.config"); // Import the authentication middleware

router.post("/register", userRegister);
router.post("/login", userLogin);


// router.use(Token);

router.get("/", Token,getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
