const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const refresh = async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies , 'cookies');
  if (!cookies?.token) return res.sendStatus(401);
  const foundUser = await prisma.user.findUnique({
    where: { token: cookies.token },
  });
  if (!foundUser) return res.sendStatus(403);
  jwt.verify(cookies.token, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
    if (err || decoded.user !== foundUser.email) {
      return res.status(403).json({ error: err.message });
    }
    const accessToken = jwt.sign(
      { user: foundUser.email },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "1m" }
    );
    res.json({ accessToken });
  });
};

module.exports = { refresh };
