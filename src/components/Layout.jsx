import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()
  const hideHeadFooter = ['/login', '/register', '/profile', '/reset-password']

  const hideAll = hideHeadFooter.includes(location.pathname) 
  return (
    <div>
       {!hideAll && <Navbar />}
        <Outlet />
       {!hideAll && <Footer />}
    </div>
  )
}

export default Layout