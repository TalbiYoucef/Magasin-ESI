const router = require("express").Router();
const { loginUser, createUser } = require("../Controllers/AuthController");

router
.post("/register", createUser)
.post("/login", loginUser);

module.exports = router;
