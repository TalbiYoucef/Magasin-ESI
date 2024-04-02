import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { Card, Card2, Card3, Users, View, Delete, CreateUser, Login ,Profils ,EditPassword, EditProfile,EditUser ,Role,Permissions,Dashboard} from './components/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './components/reset/AppContext';


function App() {
  return (
    <AppProvider>  
     
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />//done
          <Route path="/dashboard" element={<Dashboard />} />//done
          <Route path="/EditPassword" element={<EditPassword />} />//done
          <Route path="/EditProfile" element={<EditProfile />} />//done
          <Route path="/EditUserProfile/:id" element={<EditUser />} />//done
          <Route path="/roles" element={<Role />} /> //done
          <Route path="/permissions-management" element={<Permissions />} />
          <Route path="/users" element={<Users />} />//done
          <Route path="/setting" element={<Profils />} />//done
          <Route path="/CreateUser" element={<CreateUser />} />//done
          {/* <Route path="/delete" element={<Delete />} /> */}
          {/* <Route path="/view" element={<View />} /> */}
          {/* <Route path="/dashboard" element={<View />} /> */}
          <Route path="/reset1" element={<Card />} />//done
          <Route path="/reset2" element={<Card2 />} />//done
          <Route path="/reset3" element={<Card3 />} /> //done
        </Routes>
      </div>
    </Router> 

    </AppProvider> 

  );
}

export default App;

