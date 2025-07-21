import {Router,Routes,Route} from 'react-router-dom'

import './App.css'
import TableData from './components/TableData'
import Login from './components/Login'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {
 

  return (
    <>  
    
    <ToastContainer position='top-right'/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<TableData/>}/>
      </Routes>  
    </>
  )
}

export default App
