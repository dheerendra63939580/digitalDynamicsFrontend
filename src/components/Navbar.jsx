import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"
import search from '../assets/icons/search.png'
import arrowDown from '../assets/icons/downArrow.png'
import { NavbarMobile } from './NavbarMobile'
import { getApi } from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { accessProfile, logout, setProfile } from '../reduxToolkit/slices/userSlice'
const Navbar = () => {
    const profile = useSelector(accessProfile)
    const dispatch = useDispatch();
    const [showEditButton, setShowEditButton] = useState(false);
    useEffect(() => {
        if(localStorage.getItem("token"))
            getProfile()
    }, [])
    const getProfile = async () => {
        try {
            const res = await getApi("/user/profile");
            dispatch(setProfile(res?.data?.data));
        } catch(err) {
            dispatch(logout())
        }
    }
    return (
        <>
            <nav className="nav-container flex-col gap-3 lg:p-[10px_80px] sm:p-[10px_15px] p-[10px_16px] sticky top-0 md:flex hidden">
                <div className="flex justify-between gap-2 max-[461px]:flex-col">
                    <span >
                        24*7 Service <span className="font-bold">123-8877332</span>
                    </span>
                    <div className="flex gap-6">
                        <Link to="/">Shipping & Return</Link>
                        <Link to="/">Tract order</Link>
                    </div>
                </div>
                <div className="flex justify-between max-[378px]:flex-col gap-2">
                    <Link to="/">Digital Dynamics</Link>
                    <div className="flex gap-1 bg-white p-[4px_8px] items-center rounded-lg justify-between">
                        <input type="text" placeholder='Search product'
                            className="border-none outline-none  bg-transparent"
                        />
                        <img src={search} alt="" className="w-8" />
                    </div>
                </div>
                <ul className="link-container flex gap-10 justify-between items-center">
                    <div className="flex flex-wrap gap-3">
                        <li className="color-white group relative">
                            <div className="flex  items-center gap-1">
                                <span>All Products</span>
                            </div>
                            <div className="hidden group-hover:flex flex-col gap-3 absolute bg-blue-600 p-1 w-[200px] rounded-lg">
                                <Link to="/product/air conditioner">Air conditionar</Link>
                                <Link to="/product/kitchen appliances">Kitchen appliances</Link>
                                <Link to="/product/laptop">PCs and laptops</Link>
                                <Link to='/product/mobile'>Mobile</Link>
                                {/* <Link>Smart home</Link> */}
                            </div>
                        </li>
                        {/* <li><Link>Home appliances</Link></li> */}
                        <li><Link to="/product/audio video">Audio & video</Link></li>
                        <li><Link to="/product/refrigerator">Refrigrator</Link></li>
                        <li><Link>New Arrivals</Link></li>
                        {/* <li><Link>Today's deal</Link></li> */}
                        <li><Link>Gift cards</Link></li>
                    </div>
                    <div className="flex gap-3 whitespace-nowrap">
                        <li><Link to="/product/cart">Cart</Link></li>
                        {!profile.name && <li><Link to='/login'>Login</Link></li> }
                       {profile.name && 
                       <div 
                            className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded-lg relative cursor-pointer"
                            onClick={() => setShowEditButton(!showEditButton)}
                        >
                            <span>{profile?.name}</span>
                            <img src={arrowDown} alt="" className={`w-6 ${showEditButton && "rotate-180"}`}/>
                           {showEditButton && 
                           <div className="bg-gray-200 px-2 py-1 absolute flex flex-col gap-2 right-0 left-0 -bottom-[68px] rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                           >
                                <button>Edit Profile</button>
                                <button>Log out</button>
                            </div> }
                        </div> }
                    </div>
                </ul>
            </nav>
            <div className="block md:hidden">
                <NavbarMobile/>
            </div>
        </>
    )
}

export default Navbar 