import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"

// Layout component to display footer and header sections on any child route
export default function Layout() {
    return (
        <>

            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}