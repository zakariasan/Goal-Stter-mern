import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [user, setUser] = useState(false)
	console.log(user)	
	//const navigate = useNavigate()
	
	return (
		<>
      <Router>
        <div className="container">
          <Header user={user}/>
			  <Routes >	
				  <Route   path={user?'/':'/login'} element={user?<Dashboard/>: <Login user={user} setUser={setUser}/>} />
				  <Route  path="/login" element={<Login user={user} setUser={setUser}/> } />
				  <Route  path="/register" element={<Register />} />
				  
				  <Route path="*" element={<Navigate to="/login" />}/>
</Routes>
          <ToastContainer />
        </div>
      </Router>
		</>
	);
}

export default App;
