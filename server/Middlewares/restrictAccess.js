const jwt = require("jsonwebtoken");
const db = require("../models");
require("dotenv").config();
function compareRoleArrays(array1,array2) {
  let sortedArray1 = array1.sort();
  let sortedArray2 = array2.sort();
  let equalElements=true;
  minlength= Math.min(sortedArray1.length,sortedArray2.length);
  for(let i = 0; i < minlength; i++){
    if(sortedArray1[i] !== sortedArray2[i]){
      equalElements=false;
    }
  }
  if(equalElements && sortedArray1.length === sortedArray2.length){
    return ("blocked");
  }//verified that all the elements are equal after sorting => restricted roles

  if(equalElements && (sortedArray1.length > sortedArray2.length)){
      let checkSubset = (parentArray, subsetArray) => {
          return subsetArray.every((el) => {
              return parentArray.includes(el)
          })
      }
      if(checkSubset(sortedArray1,sortedArray2)){
          return ("blocked");
      }else{
          return ("allowed");
      }
  }
  if(!equalElements && (sortedArray1.length > sortedArray2.length)){
      let checkSubset = (parentArray, subsetArray) => {
          return subsetArray.every((el) => {
              return parentArray.includes(el)
          })
      }
      if(checkSubset(sortedArray1,sortedArray2)){
          return ("blocked");
      }else{
          return ("allowed");
      }
  }//verified that all the elements are equal after sorting but restricted roles array is bigger therefore user has a blocked role

  if(equalElements && (sortedArray2.length> sortedArray1.length)){
    return ("allowed");
  }//verified that all the elements are equal after sorting but user role array is bigger therefore he has a non blocked role

  if(!equalElements ){
    return ("allowed");
  }//verified that there's at least one role that is not restricted

}


  

function restrictAccess(blacklistedRoles) {
  return verifyRole = async (req, res, next) => {
    const authHeaders = req.headers["authorization"];
    if (!authHeaders) return res.sendStatus(401);
    const accessToken = authHeaders.split(" ")[1];
    if (accessToken) {
      jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_KEY,
        async (err, decoded) => {
          if (err) {
            res.sendStatus(401);
          } else {
            try {
              const user = await db.User.findOne({
                where: {
                  email: decoded.user, // Assuming the decoded token contains the user ID
                },
              });
              if (!user) {
                res.sendStatus(401); // User not found
              } else {
                // Attach the user object to the request
                req.user = user; // user is the user object
                let roles = [];
                await db.User.findOne({
                  where: {
                    user_id: user.user_id,
                  },
                })
                  .then(async (resp) => {
                    await db.User_Role.findAll({
                      where: { user_id: resp.user_id },
                    })
                      .then((res) => {
                        res.map((element) => {
                          roles.push(element.role_id);
                        });
                      })
                      .catch((err) => console.log("err fetching user roles"));
                  })
                  .catch((err) => console.log("err fetching user ", err));
                  //case 1 :  sort + verify if all the elements are equal => we block access
                  //case 2 :sort + verify if there's another role besides the restricted roles => we allow access
                  //case 3 :sort + all the elements of the second array are included in the first array
                if(compareRoleArrays(blacklistedRoles,roles)=="allowed"){
                  next()
                }else{
                  res.sendStatus(403);
                }
              }
            } catch (error) {
              console.error("Error verifying JWT:", error);
              res.sendStatus(500);
            }
          }
        }
      );
    } else {
      res.sendStatus(403);
    }
  }
};

module.exports = restrictAccess;
