const express = require("express");
const cors = require("cors");
const verifyJWT = require("./Middlewares/VerifyJwt");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require("./models");
const app = express();
const port = process.env.PORT || 3036;
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
app.use("/products", require("./Routes/ProductRouter")); //done
app.use("/branches", verifyJWT, require("./Routes/BranchRouter")); //done
app.use("/chapters", verifyJWT, require("./Routes/ChapterRouter")); //done
app.use("/commands", require("./Routes/CommandRouter")); //
app.use("/purchaseorders", require("./Routes/PurchasingOrderRouter")); //newest additions
app.use("/suppliers", require("./Routes/SupplierRouter")); //newest additions
app.use("/receipts", require("./Routes/ReceiptRouter")); //newest additions
app.use("/internalorders", require("./Routes/InternalOrderRouter")); //newest additions
app.use("/exitnotes", require("./Routes/ExitNoteRouter")); //newest additions
app.use("/returnnotes", require("./Routes/ReturningNoteRouter")); //newest additions
app.post("/finduser", async (req, res) => {
  const { token } = req.body;
  const foundUser = await db.User.findOne({ where: { token: token } });
  if (!foundUser) return res.json({ err: "user  not found" });
  return res.json({ foundUser });
});

app.delete("/", async (req, res) => {
  try {
    await db.PurchasingOrder.destroy({
      where: {},
      // truncate: true
    })
      .then((resp) => {
        res.status(200).send("deleted");
      })
      .catch((err) => res.status(500).send("error"));
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/create-br", (req, res) => {
  const chapters = [
    "Remboursement frais",
    "Matériel et mobilier",
    "Fournitures",
    "Documentation",
    "Habillement personnel",
    "Parc auto",
    "Travaux entretien",
    "Matériel accessoires informatique",
    "Matériel et mobilier pédagogique",
    "Frais liés aux études de post-graduation",
    "Participation aux organismes nationaux et internationaux",
    "Activités culturelles sportives et scientifiques aux étudiants",
    "Frais de fonctionnement liées à la recherche scientifique et au développement",
  ];

  const array11 = ["Frais de réception"];

  const array12 = [
    "Acquisition du matériels et mobiliers de bureaux",
    "Acquisition du matériel de prévision et de sécurité",
    "Acquisition de materiel audiovisuel",
    "Acquisitions du matériel de reprographie et d'imprimante",
    "Acquisition et entretien du matériel médicale",
  ];

  const array13 = [
    "Papeterie et fournitures de bureaux 1",
    "Produit d'entretien",
    "Fournitures de laboratoires et des ateliers d'enseignement et de recherche",
    "Produits pharmaceutiques et chimiques",
    "Frais de rellures et d'impression",
    "Papier d'ensignement",
    "Acquisition de drapeaux nationaux",
  ];

  const array14 = ["Ouvrages des bibliothéques"];

  const array16 = ["Habillement des personnels de service"];

  const array17 = [
    "Acquisitions du carburant et lubrifiants et graisses",
    "Acquisition des pneu pour voiture",
    "Entretien, réparation et achat d'outillage et pièces de recharges",
  ];
  const array18 = ["Quincaillerie"];

  const array21 = ["Acqisition du matériels informatiques"];

  const array22 = ["Acquisition du matériels et mobiliers pédagogiques."];

  const array23 = [
    "Matériels et fournitures au profit poste graduation",
    "Logiciels informatiques Spécialisé",
  ];

  const array27 = ["Activité culturelle", "Activite sportive"];

  const array32 = ["Matériels, instrument et petit outillages scientifiques"];
  const branches = [
    { id: 1, array: array11 },
    { id: 2, array: array12 },
    { id: 3, array: array13 },
    { id: 4, array: array14 },
    { id: 5, array: array16 },
    { id: 6, array: array17 },
    { id: 7, array: array18 },
    { id: 8, array: array21 },
    { id: 9, array: array22 },
    { id: 10, array: array23 },
    { id: 11, array: array27 },
    { id: 12, array: array32 },
  ];

  try {
    array12.map(async (ele) => {
      await db.Branch.create({ name: ele, chapter_id: 4, VAT: 19 });
    });

    res.end("done");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
app.get("/cr-perms", async (req, res) => {
  array = [
    "manage users",
    "manage roles",
    "manage permissions",
    "manage account",
    "manage chapters",
    "manage branches",
    "manage products",
    "manage suppliers",
    "manage BCE",
    "consult BCE",
    "consult FMP",
    "manage BC",
    "manage inventory",
    "consult BCI",
    "manage BS",
    "manage BD",
    "validate BCI",
    "consult store",
    "consult inventory",
    "statistics",
    "manage BCI"
  ];
  try {
    array.map(async (ele, index) => {
      await db.Permission.create({ permission_id: index+1, name: ele });
    });
    res.status(200).send('done')
  } catch (error) {
    res.status(500).send('not able to create')
  }
});
app.get("/create", async (req, res) => {
  const services = [
    "Direction Générale",
    "Secrétariat Général",
    "Département du cycle préparatoire",
    "Département du second Cycle",
    "Direction des Enseignements et des Diplômes",
    "Direction des Relations Extérieures",
    "Direction de la Formation Doctorale",
  ];
  const roles = [
    "admin",
    "store keeper",
    "head of structure",
    "consumer",
    "director",
    "purchasing service agent",
  ];
  const chapters = [
    "Remboursement frais",
    "Matériel et mobilier",
    "Fournitures",
    "Documentation",
    "Habillement personnel",
    "Parc auto",
    "Travaux entretien",
    "Matériel accessoires informatique",
    "Matériel et mobilier pédagogique",
    "Frais liés aux études de post-graduation",
    "Participation aux organismes nationaux et internationaux",
    "Activités culturelles sportives et scientifiques aux étudiants",
    "Frais de fonctionnement liées à la recherche scientifique et au développement",
  ];
  const fourni = [
    "Sarl PC STORE",
    "Nedjma Computer",
    "Ouadah Informatique",
    "Alpha Computers",
    "SARL Méditerranéenne d'Informatique",
    "ABK Informatique",
    "Centre Informatique de l'Ouest (CIO)",
    "Société Algérienne d'Informatique (SAI)",
    "Informatique Vision Plus (IVP)",
    "Global Informatique Algérie",
    "Computer World",
  ];
  const permissions = [
    "createChapters",
    "readChapters",
    "updateChapters",
    "deleteChapters",
    "createBranches",
    "readBranches",
    "updateBranches",
    "deleteBranches",
    "createServices",
    "readServices",
    "updateServices",
    "deleteServices",
    "createUsers",
    "readUsers",
    "updateUsers",
    "deleteUsers",
    "createCommands",
    "readCommands",
    "updateCommands",
    "deleteCommands",
    "createInternalOrders",
    "readInternalOrders",
    "updateInternalOrders",
    "deleteInternalOrders",
    "createExitNotes",
    "readExitNotes",
    "updateExitNotes",
    "deleteExitNotes",
    "createPermissions",
    "readPermissions",
    "updatePermissions",
    "deletePermissions",
    "createProducts",
    "readProducts",
    "updateProducts",
    "deleteProducts",
    "createProductQuantities",
    "readProductQuantities",
    "updateProductQuantities",
    "deleteProductQuantities",
    "createSuppliers",
    "readSuppliers",
    "updateSuppliers",
    "deleteSuppliers",
    "createPurchasingOrders",
    "readPurchasingOrders",
    "updatePurchasingOrders",
    "deletePurchasingOrders",
    "createReceiptNotes",
    "readReceiptNotes",
    "updateReceiptNotes",
    "deleteReceiptNotes",
    "createReturnNotes",
    "readReturnNotes",
    "updateReturnNotes",
    "deleteReturnNotes",
    "createRoles",
    "readRoles",
    "updateRoles",
    "deleteRoles",
    "createRole_Permissions",
    "readRole_Permissions",
    "updateRole_Permissions",
    "deleteRole_Permissions",
    "createUser_Roles",
    "readUser_Roles",
    "updateUser_Roles",
    "deleteUser_Roles",
  ];
  const products = [
    "Arrache clou",
    "Ballast pour néon",
    "Bipolaire 10,16,20,25A",
    "Boite à Soudure 2,25",
    "Boite à Soudure 3,25",
    "Boite argent",
    "Boite étanche",
    "Boite Senelgaz",
    "Bouchon 20/27",
    "Brouette à roue",
    "Cable éléctrique 1,5 *2 rol m",
    "Cable éléctrique 2,5*2 rol m",
    "Cable4*10m",
    "Cable4*16m",
    "Cadna G/M",
    "Cadna P/M",
    "CadnaM/M",
    "Caisse à outille éléctricien",
    "Caisse à outille plombier",
    "Caisse à outils vide",
    "canon poour serreur à bois",
    "canon poour serreur Mischler",
    "Chain diam 60cm",
    "chalumeau",
    "charteton G/M",
    "charteton P/M",
    "Chaux en sac",
    "Chignole G/M",
    "Chignole p/m",
    "Ciseau pour jadinage",
    "Ciseau pour multicouche",
    "Clapet 26/34",
    "Clapet 33/42",
    "Clé a griffe G/M",
    "Clé à griffe P/M",
    "Clé à molette",
    "Clé six ponts",
    "Coffre fort GM",
    "Coffre fort pm",
    "coffret",
    "Coffret de distribtion18 modeles 1 rounge",
    "Coffret de distribtion18 modeles 2 rounge",
    "Colle blanche à bois 1kg",
    "Colle de PVC 500g",
    "Collier atlas n°12",
    "Collier atlas n°14",
    "Collier en plastique",
    "Collier métallique",
    "Contecteur D25 220v relai sur rail",
    "Contecteur D9 220v relai sur rail",
    "Corde en plastique de 100m",
    "Coude 15/21",
    "Coupe Tube",
    "D,r,t (elama D,25)",
    "D,r,t (elama D,9)",
    "Débarbeuse G/M",
    "Débarbeuse p/m",
    "Diamant à coupe verre",
    "Dijoncteur 220v 32A",
    "Dijoncteur unipolaire 16-32A",
    "Disjoncteur 220v 16,20 A",
    "Disjoncteur 380 v",
    "Disjoncteur 63 A SR 380V",
    "Disjoncteur bipolaire 40A",
    "Disjoncteur différentiel Bipolaire",
    "Disjoncteur différentiel tétra polair",
    "Disjoncteur Unipolaire 10,25A à boité",
    "Disque débarbeuse 230t",
    "Domino n°10",
    "Domino n°16",
    "Domino n°25",
    "Douille avis G/M",
    "Douille avis p/m",
    "Drapeau G/F",
    "Drapeau P/M",
    "Echafaudage roulant",
    "Echelle 5m",
    "Echelle2m",
    "Essence bouteille",
    "Etain en rouleau",
    "Extincteur CO2 6Kg",
    "Fer a soudeur",
    "Fil éléctrique 1,5 /100m",
    "File éléctrique 2,5 souple m",
    "Flotteur éléctrique",
    "Fourche",
    "Frigo p/m",
    "Fusible cartouche 63,40A",
    "Gant en cuir de protection",
    "Gaz pour climatiseur",
    "GOULOTTE 50*105",
    "GOULOTTE 50*130",
    "Houe avec manche",
    "Huile de lin",
    "Inipolaire 10,16,20,25 A",
    "Interrupteur apparent",
    "Interupteur Poussoir",
    "Interupteur double allumage",
    "Interupteur encastre",
    "jeux de clé à fourche",
    "jeux de mache à béton",
    "jeux de mache métallique",
    "Jeux de méche à bois",
    "Jeux de méche acier",
    "Jeux de robinet radiateur",
    "Lame de scie à métaux",
    "Lampe à vise 250we27",
    "Lampe néant économique 150w e27",
    "Lampe Osram 160w",
    "Lampe Osram 160w et 250 mix",
    "Lampe projecteur 500w",
    "le bouchon de robinet n°14",
    "Les atteches en plastique pm,gm",
    "Mallette",
    "Mamlon n°15/21",
    "Mamlon n°20/27",
    "Mamlon n°26/34",
    "Marteau",
    "Métre 5m",
    "Métrix analogique",
    "Metrix numérique",
    "Meuleuse",
    "Molette acouper le verre",
    "Multicouche 100m",
    "Néon 1,20m",
    "Néon Complet 0,60m",
    "Non double diviseur 1,20m",
    "Paquet chevielle n°08",
    "Paquet chevielle n°10",
    "Peinture antirouille 3kg",
    "Peinture la laque 1kg",
    "Pelle avec manche",
    "Perceuse",
    "Perceuse visseuse",
    "Pince Coupante",
    "pince crcodile",
    "pince universelle",
    "Pinceau Plat",
    "Pinceau Rond",
    "pioche avec manche",
    "poste à Soudure",
    "Poubelle avec àroue",
    "Poubelle en caoutchouc",
    "Poubelle en caoutchouc P/M",
    "Poubelle G/M en PVC",
    "Poupée de filasse",
    "Prise apparente",
    "Prise de courant double 16A",
    "Prises Simples",
    "Projecteur",
    "Rabot manuel",
    "Raboteuse Eléctrice",
    "Raccord piéces 15/21",
    "Raccord piéces 20/27",
    "Raclette 16",
    "Rallange éléctrique portative de 40m",
    "Rallange multiprise",
    "Rallange pour poste Soudure",
    "Réduction 15/21 Famelle",
    "Réduction 15/21 mal",
    "Régllette néant double 1,20m",
    "Robinet 15/21 chromé",
    "Robinet 15/21 jaune",
    "Robinet 15/21 papillon",
    "Robinet 20/27",
    "Rondelle acie large6,8,10,12",
    "Rouleau de peinture p/m",
    "Rouleau fil 2,5 100m",
    "Scie pour jardinage",
    "serrure à bois",
    "serrure à mischler",
    "Siphon pour lavabo",
    "Starteur néon",
    "Teflon",
    "Tondeuse à gazon",
    "tournevise Amérécain",
    "tournevise plat",
    "Transformateur néon 40w",
    "Truelle de maçon",
    "Tube de pinteure créme",
    "Tube de pinteure noir",
    "Tube Néon 0,60m",
    "Tube Néon 1,20 m",
    "Tuyau d'arrosage",
    "Vachette double canon",
    "Vachette Electrique",
    "Venne d'arret 15/21 papillon",
    "Venne d'arrét 40",
    "Venne d'arret32",
    "Vernis 01 KG",
    "Verrou G/M",
    "Vis parker boite 4*25",
  ];
  try {
    products.map(async (pro) => {
      await db.Product.create({
        name: pro,
        quantity:1000,
      });
    });
  } catch (error) {}
  // try {
  //   fourni.map(async (ele) => {
  //     await db.Supplier.create({
  //       name: ele,
  //       email:'suplier@sup.com',
  //       address:"SBA Algeria",
  //       phone_num:"0987654321",
  //       registre_c:"8013489734",
  //       RIB:"000899848193",
  //       NIF:"0078678425"
  //     });
  //   });
  //   services.map(async (ele) => {
  //     await db.Service.create({
  //       name: ele,
  //     });
  //   });
  //   await db.User.create({
  //     username: "hamida2004",
  //     firstname: "dadda",
  //     lastname: "hamida",
  //     address: "ADRAR Algeria",
  //     phone_num:"0657199109",
  //     email: "h.dadda@esi-sba.dz",
  //     password: "name my say",
  //     service_id: 1,
  //   });

  //   permissions.map(async (ele) => {
  //     await db.Permission.create({
  //       name: ele,
  //     });
  //   });

  //   roles.map(async (ele) => {
  //     await db.Role.create({
  //       name: ele,
  //     });
  //   });
  //   chapters.map(async (ele) => {
  //     await db.Chapter.create({
  //       name: ele,
  //     });
  //   });

  //   // await db.User.create({username :"hamida2004",firstname:"dadda",lastname:"hamida",email:"h.dadda@esi-sba.dz",address:"adrar",phone_num:"0987654321",password:"name my say",service_id:1})
  //   res.end("done");
  // } catch (err) {
  //   res.status(500).send({ error: err.message });
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
