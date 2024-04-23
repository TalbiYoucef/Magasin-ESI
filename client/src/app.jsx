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
import Rollig from "./components/CommandManagement/commandLign";
import BonDeReception from "./components/BR/ViewBR";
import Receip from "./components/ReceiptMang/CreateReceipt";
import EditCmdEx from "./components/EditCMD/EditCommandEx";

function App() {
  return (
    <AppProvider>
      <Router>
        <div>
          <Routes>
            <Route path="bonR" element={<BonDeReception/>}/>
            <Route path="/br" element={<Receip />} />
            <Route path='/bc' element={<BonDeComande/>}/>
            <Route path="/rl" element={<Rollig/>}/>//done
            <Route path="/commands" element={<Cmds/>} />//done
            <Route path='/create-cmd' element={<CreateCmd/>}/>//done
            <Route path="/edit-cmd/:id" element={<EditCmd/>}/>//done
            <Route path="/login" element={<Login />} />
            <Route path="/edit-cmd" element={<EditCmdEx/>}/>//done

            //done
            <Route path="/dashboard" element={<Dashboard />} />
            //done
            <Route path="/EditPassword" element={<EditPassword />} />
            //done
            <Route path="/EditProfile" element={<EditProfile />} />
            //done
            <Route path="/EditUserProfile/:id" element={<EditUser />} />
            //done
            <Route path="/roles" element={<Role />} /> //done
            <Route path="/permissions-management" element={<Permissions />} />
            <Route path="/users" element={<Users />} />
            //done
            <Route path="/setting" element={<Profils />} />
            //done
            <Route path="/CreateUser" element={<CreateUser />} />
            //done
            {/* <Route path="/delete" element={<Delete />} /> */}
            {/* <Route path="/view" element={<View />} /> */}
            {/* <Route path="/dashboard" element={<View />} /> */}
            <Route path="/reset1" element={<Card />} />
            //done
            <Route path="/reset2" element={<Card2 />} />
            //done
            <Route path="/reset3" element={<Card3 />} /> //done
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
