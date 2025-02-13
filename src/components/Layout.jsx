import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

export const Layout = () => {
    
    return(
        <div className="p-2 bg-blue-50 min-h-screen">
            <div className="mb-10 md:mb-3">
                <Navbar/>
            </div>
            {<Outlet/>}
        </div>
    )
}