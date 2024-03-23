const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, User_Role, Role } = require("../models"); // Assuming all models are defined in models.js
require("dotenv").config();

const createUser = async (req, res) => {
  const {
    firstname,
    lastname,
    email,
    address,
    phone_num,
    status,
    roles,
    password,
  } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "This email is already registered" });
    }
    let i = 0;
    const findRolesIds = async (user) => {
      for (const element of roles) {
        console.log(element); // Logging the current role element

        try {
          const resp = await Role.findOne({ where: { name: element } });
          console.log("res:", resp);

          if (resp) {
            await User_Role.create({
              user_id: user.user_id,
              role_id: resp.role_id,
            });
          } else {
            console.log(`Role '${element}' not found.`);
          }
        } catch (err) {
          console.error("Error:", err);
        }
      }
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      address,
      phone_num,
      status,
      password: hashedPassword,
    });
    await findRolesIds(user, roles);
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign(
        { user: user.email },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        { user: user.email },
        process.env.REFRESH_TOKEN_KEY,
        { expiresIn: "30d" }
      );
      await User.update(
        { token: refreshToken },
        { where: { email: user.email } }
      );
      res.cookie("token", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      let roles = [];
      await User_Role.findAll({ where: { user_id: user.user_id } }).then(
        (resp) => {
          resp.map((element) => {
            roles.push(element.role_id);
            console.log("ele", element);
          });
        }
      );
      res.json({ accessToken, roles: roles });
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.token) {
      return res.status(204).json({ msg: "Logged out successfully" });
    }
    const foundUser = await User.findOne({ where: { token: cookies.token } });
    if (!foundUser) {
      res.clearCookie("token", {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(204).json({ msg: "Logged out successfully" });
    }
    await User.update({ token: "" }, { where: { token: cookies.token } });
    res.clearCookie("token", {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser, logout };
