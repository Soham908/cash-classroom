
import './App.css';
import { Routes,Route } from "react-router-dom"
import Login from './pages/Login';
import Register from './pages/Register';
import { createContext, useState } from 'react';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

export const UserContext = createContext()
function App() {
  
  const [user,setUser] = useState()

  return (
      <UserContext.Provider value={{user,setUser}}>
        <Navbar/>
        <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
      </UserContext.Provider>
  );
}

export default App;
