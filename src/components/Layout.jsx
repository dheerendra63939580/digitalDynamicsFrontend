import Navbar from "./Navbar"

export const Layout = ({children}) => {
    return(
        <div className="p-2 bg-blue-50">
            <div className="mb-9 md:mb-3">
                <Navbar/>
            </div>
            {children}
        </div>
    )
}