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
import CreateCmd from "./components/Create-cmds/createCmd1";
import EditCmd from "./components/EditCMD/EditCommand";
import BonDeComande from "./components/EPC/viewEPC";
import Cmds from "./components/CommandManagement/MangCommand";
import Rollig from "./components/CommandManagement/commandLign";
import BonDeReception from "./components/BR/ViewBR";
import EditCmdEx from "./components/EditCMD/EditCommandEx";
import ViewArticles from "./components/viewArticle/ViewArticle";
import ViewChapter from "./components/ViewChapter/ViewChapter";
import ViewRole from "./components/rolesMan/ViewRole";
import Produit from "./components/produitMan/manProduits";
import NotFound from "./components/NotFound/NotFound";
import CreateRec from "./components/ReceiptMang/createRec";
import Fornisseur from "./components/fournisseurMan/manFournisseur";

function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <Routes>
            {/* //to do : */}
            <Route path="produit" element={<Produit />} />
            <Route path="view-article" element={<ViewArticles />} />
            <Route path="view-chapter" element={<ViewChapter />} />
            <Route path="bonR" element={<BonDeReception />} />
            <Route path="/br" element={<CreateRec />} />
            <Route path="/bc" element={<BonDeComande />} />
            <Route path="/create-cmd" element={<CreateCmd />} />
            {/* // already done */}
            <Route path="supp" element={<Fornisseur />}/>
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
            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
