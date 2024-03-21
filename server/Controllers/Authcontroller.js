const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'This email is already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const accessToken = jwt.sign({ user: user.email }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '1m' });
      const refreshToken = jwt.sign({ user: user.email }, process.env.REFRESH_TOKEN_KEY, { expiresIn: '30d' });
      await prisma.user.update({ where: { email: user.email }, data: { token: refreshToken } });
      res.cookie('token', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      res.json({ accessToken });
    } else {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.token) {
      return res.status(204).json({ msg: 'Logged out successfully' });
    }
    const foundUser = await prisma.user.findUnique({ where: { token: cookies.token } });
    if (!foundUser) {
      res.clearCookie('token', { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.status(204).json({ msg: 'Logged out successfully' });
    }
    await prisma.user.update({ where: { token: cookies.token }, data: { token: '' } });
    res.clearCookie('token', { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    res.status(200).json({ msg: 'Logged out successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser, logout };
