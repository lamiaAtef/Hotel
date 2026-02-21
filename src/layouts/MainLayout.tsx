
import { Outlet } from 'react-router-dom'
import NavbarUser from '../features/user/components/Navbar/NavbarUser'
import Footer from '../features/user/components/Footer/Footer'

export default function MainLayout() {
  return (
    <>
<NavbarUser/>
    <Outlet/>
    <Footer/>
    </>
  )
}
