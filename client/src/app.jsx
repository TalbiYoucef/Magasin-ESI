import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Card,
  Card2,
  Card3,
  Users,
  View,
  Delete,
  CreateUser,
  Login,
  Profils,
  EditPassword,
  EditProfile,
  EditUser,
  Role,
  Permissions,
  Dashboard,
} from "./components/index";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppProvider } from "./components/reset/AppContext";
import CreateCmd from "./components/Create-cmds/createCmd";
import EditCmd from "./components/EditCMD/EditCommand";
import BonDeComande from "./components/EPC/viewEPC";
import Cmds from "./components/CommandManagement/MangCommand";
import BonDeReception from "./components/BR/ViewBR";
import EditCmdEx from "./components/EditCMD/EditCommandEx";
import ViewArticles from "./components/viewArticle/ViewArticle";
import ViewChapter from "./components/ViewChapter/ViewChapter";
import ViewRole from "./components/rolesMan/ViewRole";
import Produit from "./components/produitMan/manProduits";
import NotFound from "./components/NotFound/NotFound";
import CreateRec from "./components/ReceiptMang/createRec";
import Fornisseur from "./components/fournisseurMan/manFournisseur";
import Articles from "./components/Article/Articles";
import Produits from "./components/Produit/manProduits";
import DemandeDeFourniture from "./components/bondesortie/bndesortie";
import Decharge from "./components/decharge/decharge";
import CreateCmdinterne from "./components/create-cmd-interne/CreateCmdinterne";
import EditDecharge from "./components/edit-decharge/EditDecharge";
import CreateDecharge from "./components/create-decharge/CreateDecharge";
import ListBonRecp from "./components/EPC/listbc";
import CommandInterne from "./components/CommandINMan/manCommandIN";
import CreateBonSortie from "./components/BonSortie/createBonSortie";
import EditBonSortie from "./components/BonSortie/editBonSortie";
import CommandInterneUser from "./components/cmdi-User/manCmdInUser";
import EditCmdinterne from "./components/edit-cmd-intern/EditCmdinterne";
import DemandeFourniture from "./components/DemandeFourniture/df";

function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <Routes>
            {/* <Route path="/edit-bon-sortie/:id" element={<EditBonSortie />} /> */}
            <Route
              path="/cmdi/:id/create-bon-decharge"
              element={<CreateDecharge />}
            />
            <Route path="/edit-bon-decharge/:id" element={<EditDecharge />} />
            <Route path="/veiw-bon-decharge/:id" element={<Decharge />} />
            {/* //to do : */}
            
            {/* // already done */}
            <Route
              path="/:idcmd/bon-reception/:id"
              element={<BonDeReception />}
            />
            <Route
              path="/veiw-bon-sortie/:id"
              element={<DemandeDeFourniture />}
            />
            <Route
              path="/cmdi/:id/create-bon-sortie"
              element={<CreateBonSortie />}
            />
            <Route
              path="/view-demande-fourniture/:id"
              element={<DemandeFourniture />}
            />
            
            <Route path="/edit-cmdi/:id" element={<EditCmdinterne />} />
            <Route path="/mes-cmnd" element={<CommandInterneUser />} />
            <Route path="/bonsdereception/:id" element={<ListBonRecp />} />
            <Route path="/cmdis" element={<CommandInterne />} />
            <Route path="/cr-cmdi" element={<CreateCmdinterne />} />
            <Route path="/bon-cmd/:id" element={<BonDeComande />} />
            <Route
              path="/order/:id/create-bon-reception"
              element={<CreateRec />}
            />{" "}
            <Route path="/chapters" element={<ViewChapter />} />
            <Route path="/produits" element={<Produit />} />
            <Route path="/chapter/:id" element={<Articles />} />
            <Route path="/articles" element={<ViewArticles />} />
            <Route path="/article/:id/produits" element={<Produits />} />
            <Route path="/create-cmd" element={<CreateCmd />} />
            <Route path="supp" element={<Fornisseur />} />
            <Route path="viewRole/:id" element={<ViewRole />} />
            <Route path="/commands" element={<Cmds />} />
            <Route path="/edit-cmd/:id" element={<EditCmd />} />
            <Route path="/login" element={<Login />} />
            <Route path="/edit-cmd" element={<EditCmdEx />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/EditPassword" element={<EditPassword />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route path="/EditUserProfile/:id" element={<EditUser />} />
            <Route path="/roles" element={<Role />} />
            <Route path="/permissions-management" element={<Permissions />} />
            <Route path="/users" element={<Users />} />
            <Route path="/setting" element={<Profils />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/reset1" element={<Card />} />
            <Route path="/reset2" element={<Card2 />} />
            <Route path="/reset3" element={<Card3 />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
