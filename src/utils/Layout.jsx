import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import './styles/layout.css';

const Layout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout