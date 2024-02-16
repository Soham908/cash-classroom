
import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom"
import Register from './pages/Register';
import { createContext, useState } from 'react';

export const UserContext = createContext()
function App() {
  
  const [user,setUser] = useState()

  return (
      <UserContext.Provider value={{user,setUser}}>
        <Routes>
          <Route path='/' element={<Register/>}/>
        </Routes>
      </UserContext.Provider>
  );
}

export default App;
