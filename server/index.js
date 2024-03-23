const express = require("express");
const cors = require("cors");
const verifyJWT = require("./Middlewares/VerifyJwt");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require('./models');

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
app.get('/cr',async (req,res)=>{
  const roleNames = [
    'admin',
    'director',
    'head of structure',
    'consumer',
    'purchasing service agent',
    'store keeper',
  ];
  roleNames.map(async(role)=>{
    await Role.create({name : "role"})
  })
  res.send("done")
})
const connectToDb = async () => {
  db.sequelize.sync().then(() => {
    app.listen(port, () => {
      console.log(`App listening on port ${port} ...`);
    });
  }).catch(error => {
    console.error('Error syncing models:', error);
  });
};

connectToDb();
