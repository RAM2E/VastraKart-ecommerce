// import React, { useEffect, useState } from "react";
// import Sidebar from "./components/Sidebar/Sidebar";
// import { Routes, Route } from "react-router-dom";
// import Add from "./pages/Add/Add";
// import List from "./pages/List/List";
// import Orders from "./pages/Orders/Orders";
// import Login from "./components/Login/Login";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css'

// export const backendUrl = "http://localhost:8080"
// export const currency = "$"


// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token'|| ''));

//   useEffect(()=>{
//     localStorage.setItem('token',token)
//   },[token])

//   return (
//     <div className="app-container">
//       <ToastContainer/>
//       {token === "" ? (
//         <Login setToken={setToken}/>
//       ) : (
//         <>
//           <div className="app-content">
//             <Sidebar setToken={setToken}/>
//             <div className="page-content">
//               <Routes>
//                 <Route path="/add" element={<Add token={token}/>} />
//                 <Route path="/list" element={<List token={token}/>} />
//                 <Route path="/orders" element={<Orders token={token} />} />
//               </Routes>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import Login from "./components/Login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GATEWAY_URL } from './utils/axios.js';

export const backendUrl = GATEWAY_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const ProtectedRoute = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <div className="app-container">
      <ToastContainer />
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className="app-content">
          <Sidebar setToken={setToken} />
          <div className="page-content">
            <Routes>
              <Route path="/add" element={
                <ProtectedRoute>
                  <Add />
                </ProtectedRoute>
              } />
              <Route path="/list" element={
                <ProtectedRoute>
                  <List />
                </ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/list" />} />
            </Routes>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;