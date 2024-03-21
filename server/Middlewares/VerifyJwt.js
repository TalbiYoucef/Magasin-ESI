const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
require("dotenv").config();

const verifyJWT = async (req, res, next) => {
  console.log("req",req.headers);
  const authHeaders = req.headers["authorization"];
  console.log(authHeaders);
  if (!authHeaders) return res.sendStatus(401);
  const accessToken = authHeaders.split(" ")[1];
  console.log(accessToken);
  if (accessToken) {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, async (err, decoded) => {
      if (err) {
        res.sendStatus(401);
      } else {
        try {
            console.log(decoded)
          // Use Prisma to find the user by ID
          const user = await prisma.user.findUnique({
            where: {
              email: decoded.user, // Assuming the decoded token contains the user ID
            },
          });
          if (!user) {
            res.sendStatus(401); // User not found
          } else {
            // Attach the user object to the request
            req.user = user; // user is the user object 
            console.log(req.user);
            next();
          }
        } catch (error) {
          console.error("Error verifying JWT:", error);
          res.sendStatus(500);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports = verifyJWT;
