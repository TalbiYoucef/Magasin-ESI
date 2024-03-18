const express = require("express");
const router = express.Router();
const { Createuser, Loguser } = require("../Controllers/Authcontroller");
router
  .get("/register", (req, res) => {
    res.send("register page");
  })
  .post("/register", Createuser)
  .get("/login", (req, res) => {
    res.send("log in page");
  })
  .post("/login", Loguser);
module.exports = router;
