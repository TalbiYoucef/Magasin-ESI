const db = require("../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const refresh = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.token) {
    return res.sendStatus(401);
  }
  try {
    const foundUser = await db.User.findOne({
      where: { token: cookies.token },
    });
    if (!foundUser) {
      return res.json({ err: "user  not found" });
    }
    const roles = await db.User_Role.findAll({
      where: {
        user_id: foundUser.user_id,
      },
    });
    let id ;
    try{
      await db.Role.findOne({
       where: { name: "admin"},
      }).then((resp)=>{
        id = resp.role_id;
      })
     }catch(err){
       console.log('no admin role found')
     }
    jwt.verify(cookies.token, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
      if (err || decoded.user !== foundUser.email) {
        console.error(err);
        return res.status(403).json({ error: err.message });
      }

      const accessToken = jwt.sign(
        { user: foundUser.email },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "2d",
        }
      );

      
      let admin = false;
      if (roles) {
        roles.map(role=>{
          if(role.role_id==id){
            admin = true
          }
        })
      }
      else{
        console.log('no roles found')
      }
      res.json({ id: foundUser.user_id, accessToken , admin , user:foundUser });
    });
  } catch (error) {
    console.error("Error occurred during refresh:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { refresh };
