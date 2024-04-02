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
app.use("/users", verifyJWT, require("./Routes/UserRouter"));
app.use("/resetpassword", require("./Routes/ResetPasswordRouter"));
app.use("/roles", verifyJWT, require("./Routes/RoleRouter"));
app.use("/permissions", verifyJWT, require("./Routes/PermissionRouter"));
app.use("/services", verifyJWT, require("./Routes/ServiceRouter"));
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
    // for (let i = 38; i < 42; i++) {
    //   await db.Role_Permission.create({ role_id: 23, permission_id: i });
    // }
    // universityServices.map(async (service) => {
    //   await db.Service.create({ name: "human ressources service" });
    // });

    // roleNames.map(async (role) => {
    //   await db.Role.create({ name: role });
    //   res.send("done");
    // });
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
// app.delete('/', async(req,res)=>{
//   await db.Permission.destroy({
//     where: {}, // This ensures that the table is truncated (i.e., all rows are deleted)
//   }).then(res.send('done'));
//   res.end('')
// })
app.get("/admin", verifyAdmin, async (req, res) => {
  const users = await db.User.findAll({});
  return res.json({ user: req.user, admin: req.isAdmin, users });
});
app.use("/auth", require("./Routes/AuthRouter")); //done
app.use("/users", require("./Routes/UserRouter")); //done
app.use("/resetpassword", require("./Routes/ResetPasswordRouter")); //done
app.use("/roles", require("./Routes/RoleRouter")); //don
app.use("/permissions", require("./Routes/PermissionRouter")); //done
app.use("/services", require("./Routes/ServiceRouter")); //done
app.use("/products", require("./Routes/ProductRouter"));
app.use("/branches", require("./Routes/BranchRouter"));
app.use("/chapters", require("./Routes/ChapterRouter"));
app.use("/commands", require("./Routes/CommandRouter"));
app.get("/create", async (req, res) => {
  try {
    // Define the list of permissions
    const universityServices = [
      "Teaching Service",
      "Student Affairs Office",
      "Student Life Service",
      "University Library Service",
      "Human Resources Service",
      "Student Affairs Office",
      "Research Service",
      "IT Service",
      "Health and Social Service",
      "Cooperation and International Relations Service",
    ];

    const permissions = [
      { name: "Read" },
      { name: "Write" },
      { name: "Delete" },
      { name: "Update" },
      { name: "Execute" },
    ];

    // Create permissions in the database
    const createdPermissions = await Promise.all(
      permissions.map((permission) => db.Permission.create(permission))
    );

    const service = await Promise.all(
      universityServices.map((ser) => db.Service.create({ name: ser }))
    );
    console.log("Permissions created:", service);
    res.end();
  } catch (error) {
    console.error("Error creating permissions:", error);
    res.end();
  }
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
