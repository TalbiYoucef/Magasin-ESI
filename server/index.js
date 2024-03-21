const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const verifyJWT = require("./Middlewares/VerifyJwt");
const cookieParser = require("cookie-parser");
const prisma = new PrismaClient();
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3030;
app.use(express.json());
app.use(cors());
app.use(cookieParser())
app.get("/", (req, res) => {
  res.json({ response: "home page" });
});
app.get('/protected', verifyJWT, (req,res)=>{
    res.send('protected')
})
app.use("/refresh", require("./Routes/RefreshRouter"));
app.use("/auth", require("./Routes/AuthRouter"));

const connectToDb = async () => {
  await prisma
    .$connect()
    .then((res) => {
        console.log("connected to db ...")
      app.listen(port, async () => {
        console.log(`app is listening on port ${port} ...`);
      });
    })
    .catch((err) => console.log(err));
};

connectToDb();
