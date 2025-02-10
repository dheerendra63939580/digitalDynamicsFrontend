import './Navbar.css'
import hamburger from '../assets/icons/hamburger.png'
import close from '../assets/icons/close.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
export const NavbarMobile = () => {
    const [hamb, setHamburger] = useState(false);
    return (
        <nav className="nav-container flex justify-between items-center px-2 fixed top-2 left-2 right-2 min-h-10">
            <div className="relative">
                <img src={hamburger} alt="" className={`w-10 ${hamb && "invisible"}`}
                    onClick={() => setHamburger(true)}
                />
                <div className={`absolute ${hamb ? "flex" : "hidden"} flex-col gap-3 absolute bg-blue-600 px-2 py-1 w-[200px]  rounded-lg left-0 top-12`}>
                    <div className="relative mb-2">
                        <img src={close} alt="" className="absolute w-8 h-8 right-0 top-0"
                            onClick={() => setHamburger(false)}
                        />
                    </div>
                    <Link top="/product/air conditioner">Air conditionar</Link>
                    <Link to="/product/kitchen appliances">Kitchen appliances</Link>
                    <Link to="/product/laptop">PCs and laptops</Link>  
                    <Link to="/product/audio video">Audio & video</Link>
                    <Link to="/product/refrigerator">Refrigrator</Link>
                    <Link>New Arrivals</Link>
                    {/* <Link>Today's deal</Link> */}
                    <Link>Gift cards</Link>
                </div>
            </div>
            <div>
                <Link to="/">Digital Dynamics</Link>
            </div>
            <div>
                <Link to='product/cart'>Cart</Link>
            </div>
        </nav>
    )
}