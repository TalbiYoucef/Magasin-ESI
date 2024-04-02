const router = require("express").Router();
const {
  loginUser,
  createUser,
  logout,
} = require("../Controllers/AuthController");
router
  .post("/register", createUser)
  .post("/login", loginUser)
  .get("/logout", logout);
module.exports = router;
