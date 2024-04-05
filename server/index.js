const express = require("express");
const cors = require("cors");
const verifyJWT = require("./Middlewares/VerifyJwt");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require("./models");
const verifyAdmin = require("./Middlewares/VerifyAdmin");
const app = express();
const port = process.env.PORT || 3030;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.json({ response: "home page" });
});
app.use("/refresh", require("./Routes/RefreshRouter"));
app.use("/auth", require("./Routes/AuthRouter"));
app.use("/users", verifyJWT,verifyAdmin, require("./Routes/UserRouter"));
app.use("/resetpassword", require("./Routes/ResetPasswordRouter"));
app.use("/roles", verifyJWT,verifyAdmin, require("./Routes/RoleRouter"));
app.use("/permissions", verifyJWT,verifyAdmin, require("./Routes/PermissionRouter"));
app.use("/services", verifyJWT,verifyAdmin, require("./Routes/ServiceRouter"));
app.use("/products", verifyJWT, require("./Routes/ProductRouter")); //done
app.use("/branches", verifyJWT, require("./Routes/BranchRouter")); //done
app.use("/chapters", verifyJWT, require("./Routes/ChapterRouter")); //done
app.use("/commands", verifyJWT, require("./Routes/CommandRouter")); //
app.post("/finduser", async (req, res) => {
  const { token } = req.body;
  const foundUser = await db.User.findOne({ where: { token: token } });
  if (!foundUser) return res.json({ err: "user  not found" });
  return res.json({ foundUser });
});
app.get("/create", async (req, res) => {
  const roleNames = [
    "admin",
    "director",
    "head of structure",
    "consumer",
    "purchasing service agent",
    "store keeper",
  ];

  const permissions = [
    "createBranch",
    "updateBranch",
    "deleteBranch",
    "createProduct",
    "updateProduct",
    "deleteProduct",
    "createCommand",
    "updateCommand",
    "deleteCommand",
    "createService",
    "updateService",
    "deleteService",
    "createChapter",
    "updateChapter",
    "deleteChapter",
  ];
  const universityServices = [
    "Academic Affairs Office", // Service de la scolarité
    "Course Scheduling Service", // Service de la planification des cours
    "Faculty Affairs Office", // Service des enseignants
    "Distance Learning Service", // Service de l'enseignement à distance
    "Internship and Project Service", // Service des stages et des projets
    "Pedagogy Service", // Service de la pédagogie
    "Assessment Service", // Service de l'évaluation
    "Continuing Education Service", // Service de la formation continue
    "International Exchange Service", // Service des échanges internationaux
    "Student Affairs Office", // Service des affaires étudiantes
  ];
  try {
    permissions.map(async (permission) => {
      await db.Permission.create({ name: permission });
    });

  } catch (err) {
    res.send(err);
  }
  // await db.Role.create({ name: "admin" });

  // for (let i = 1; i <= 20; i++) {
  //   // const productName = `product${i}`;
  //   const chapName=`chap${i}`;
  //   await db.Chapter.create({ name: chapName });
  //   const branchName = `branch ${i}`;
  //   // Create the product in the database
  //   await db.Branch.create({ name: branchName });
  //   const productName = `product ${i}`;
  //   await db.Product.create({ name: productName, qt_logique: 10, qt_physique: 10 });
  // }
});


const connectToDb = async () => {
  db.sequelize
    .sync()
    .then(() => {
      app.listen(port, () => {
        console.log(`App listening on port ${port} ...`);
      });
    })
    .catch((error) => {
      console.error("Error syncing models:", error);
    });
};

connectToDb();
