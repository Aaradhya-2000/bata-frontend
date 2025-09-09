import About from "./components/about"
import Footer from "./components/footer"
import Header from "./components/header"
import { Outlet } from "react-router-dom"

const Layout = ()=>{
    return(
        <>
        
         <Header/>
         
         <Outlet/>
         <About/>
         <Footer/>
        </>
    )
}

export default Layout