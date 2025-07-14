import {Router,Routes,Route} from 'react-router-dom'

import './App.css'
import TableData from './TableData'

function App() {
 

  return (
    <>  
      <Routes>
        <Route path="/" element={<TableData/>}/>
      </Routes>  
    </>
  )
}

export default App
