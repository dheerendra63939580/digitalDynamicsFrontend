import './Navbar.css'
import hamburger from '../assets/icons/hamburger.png'
import close from '../assets/icons/close.png'
import profile from '../assets/icons/profile.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accessProfile, logout } from '../reduxToolkit/slices/userSlice'
import { EditProfile } from '../pages/EditUserProfile'
export const NavbarMobile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userProfile = useSelector(accessProfile)
    const [hamb, setHamburger] = useState(false);
    const [showEditButton, setShowEditButton] = useState(false);
    const [editProfile, setEditProfile] = useState(false)
    return (
        <nav className="nav-container flex justify-between items-center px-2 fixed top-0 left-0 right-0 min-h-10">
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
                    <Link to="/product/air conditioner"  onClick={() => setHamburger(false)} >Air conditionar</Link>
                    <Link to="/product/kitchen appliances"  onClick={() => setHamburger(false)} >Kitchen appliances</Link>
                    <Link to="/product/laptop"  onClick={() => setHamburger(false)} >PCs and laptops</Link>
                    <Link to="/product/audio video"  onClick={() => setHamburger(false)} >Audio & video</Link>
                    <Link to="/product/refrigerator"  onClick={() => setHamburger(false)} >Refrigrator</Link>
                    <Link className="bg-gray-600"  onClick={() => setHamburger(false)} >New Arrivals</Link>
                    {/* <Link>Today's deal</Link> */}
                    <Link className="bg-gray-600">Gift cards</Link>
                </div>
            </div>
            <div>
                <Link to="/">Digital Dynamics</Link>
            </div>
            <div>
                <Link to='product/cart'>Cart</Link>
            </div>
            {!userProfile.name ? <li><Link to='/login'>Login</Link></li> :
                <div className="relative">
                    <img src={profile} alt="" className="w-10"
                        onClick={() => setShowEditButton(!showEditButton)}
                    />
                    <div className={`bg-gray-200 px-2 py-1 absolute flex flex-col gap-1 right-0 rounded-lg ${!showEditButton && "hidden"}`}>
                        <span className="whitespace-nowrap">{userProfile?.name}</span>
                        <hr className="border border-gray-500" />
                        <button
                            onClick={() => {setEditProfile(true); setShowEditButton(false)}}
                        >
                            Edit Profile
                        </button>
                        <hr className="border border-gray-500"/>
                        <button
                            onClick={() => {setShowEditButton(false); navigate("/address"); }}
                        >
                            Addresses
                        </button>
                        <hr className="border border-gray-500" />
                        <Link to="/order">
                            <div className="text-black text-center"
                                onClick={() => setShowEditButton(false)}
                            >View Orderes</div>
                        </Link>
                        <hr className="border border-gray-500"/>
                        <button
                            onClick={() => dispatch(logout())}
                        >
                            Log out
                        </button>
                    </div>
                </div>}
            <div
                className={`absolute z-50 bg-white right-2 top-2 transition-transform duration-300 ${editProfile ? "translate-x-0" : "translate-x-full"
                    } rounded-lg`}
            >
                {editProfile && <EditProfile handleClose={() => setEditProfile(false)} />}
            </div>
        </nav>
    )
}