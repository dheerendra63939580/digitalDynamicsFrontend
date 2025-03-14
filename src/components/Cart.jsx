import { useState } from "react";
import "./Cart.css"
import { useSelector } from "react-redux";
import { accessProfile } from "../reduxToolkit/slices/userSlice";
import { AddAddress } from "../pages/addresses/AddAddress";
import { useNavigate } from "react-router-dom";
import { postApi } from "../api";
import toast from "react-hot-toast";
import close from "../assets/icons/close.png"
import { ViewAddress } from "../pages/addresses/ViewAddress";
import { Modal } from "../Modal";
import { ShowEmpty } from "./ShowEmpty";
const Cart = () => {
    const profile = useSelector(accessProfile);
    const navigate = useNavigate()
    const [addressId, setAddressId] = useState("");
    const [showAddressOption, setshowAddressOption] = useState(false);
    const [showAddAddress, setShowAddAddress] = useState(false);
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItem") || "[]"));
    const subTotal = cartItems?.reduce((acc, value) => acc + value?.price * value?.quantity, 0);
    function increaseQuantity(id) {
        const updatedCart = cartItems.map(item => 
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
        
        setCartItems(updatedCart);
        localStorage.setItem("cartItem", JSON.stringify(updatedCart));
    }
    function decreaseQuantity(id) {
        const updatedItem = cartItems?.map((value) => value?._id === id && value?.quantity > 1 ? {...value, quantity: value?.quantity - 1} : value)
        setCartItems(updatedItem)
        localStorage.setItem("cartItem", JSON.stringify(updatedItem));
    }
    const handleCheckout = async () => {
        if(!profile?.name)
            navigate("/login")
        if(!profile?.addresses?.length) {
            handleShowAddress();
            return;
        }
        if(!addressId) {
            toast.error("Select address");
            return;
        }
        let payload = [];
        cartItems.forEach(({_id, quantity, price}) => payload.push({_id, quantity, price}))
        try {
            payload = {products: payload, addressId}
            const res = await postApi(`/product/purchase/${profile.id}`, payload);
            toast.success(res.data.message);
            const failedIds = res.data.data.failedProducts
            const cartItem = cartItems.filter(({ _id }) => !res.data.data.purchasedProducts.includes(_id));
            for(let failedValues of failedIds) {
                for(let value of cartItem) {
                    if(failedValues?._id === value?._id) {
                        value.failedReason = failedValues?.reason;
                        break;
                    }
                }
            }
            localStorage.setItem("cartItem", JSON.stringify(cartItem));
            setCartItems([...cartItem])
        } catch(err) {
            console.log(err)
            toast.error("err", err.data.message)
        }
    }
    const removeItemFromCart = (id) => {
        const updatedCartItem = cartItems.filter((value) => value?._id !== id);
        toast.success("Product removed successfully");
        localStorage?.setItem("cartItem", JSON.stringify(updatedCartItem));
        setCartItems(updatedCartItem);
    }

    const handleShowAddress = () => {
        setShowAddAddress(!showAddAddress)
    }
    const handleAddressOption = () => {
        if(profile.name) {
            setshowAddressOption(!showAddressOption);
        }
        navigate("/login")
        
    }
    if(cartItems?.length === 0)
        return(
        <ShowEmpty>
            Cart is empty
        </ShowEmpty>
        )
    return(
        <div className="m-auto  lg:w-[80%]">
            <h1 className="text-xl p-2 mb-2">Cart</h1>
            <div className="flex gap-4 justify-center flex-col md:flex-row md:justify-between w-full">
                <div className="overflow-auto w-full">
                    <table className="cart-table bg-gray-100">
                        <thead className="bg-blue-500">
                            <tr className="py-2">
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Sub Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems?.map((value, index) => (
                                <tr key={`cart ${index}`} className="relative">
                                    <td>
                                        {value?.failedReason && (
                                            <span className="text-red-600 absolute -bottom-1">
                                                <span className="bubble"></span>{value?.failedReason}. Remove it from cart.
                                            </span>
                                        )}
                                        <div className="flex gap-2 items-center">
                                            <img 
                                                src={close} 
                                                className="bg-red-300 w-8 cursor-pointer"
                                                onClick={() => removeItemFromCart(value?._id)}
                                            />
                                            <img src={value?.image} alt="" className="w-24 aspect-square sm:object-contain" />
                                            <span>{value?.name}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap">{value?.price} INR</td>
                                    <td>
                                        <span 
                                            className="bg-blue-500 px-4 py-2 text-white cursor-pointer text-lg"
                                            onClick={() => increaseQuantity(value?._id)}
                                        >
                                            +
                                        </span>
                                        <span className="bg-white px-4 py-2">{value?.quantity}</span>
                                        <span 
                                            className="bg-blue-500 px-4 py-2 text-white cursor-pointer text-lg"
                                            onClick={() => decreaseQuantity(value?._id)}
                                        >
                                            -
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap">{value?.price * value?.quantity} INR</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="border border-gray-400 min-w-[250px] h-fit md:sticky md:top-[133px] ">
                    <h1 className="bg-blue-500 pl-2 py-2">Cart Totals</h1>
                        <div className="px-2">
                            <div className="p-2 border-b-gray-300 border-b-2">
                                <span className="text-gray-600">Sub Total</span> {subTotal}
                            </div>
                            <div className="p-2 border-b-gray-300 border-b-2">
                                <span>Total</span> {subTotal}
                            </div>
                            <span className="text-gray-400 my-3 block bg-gray-600">Have a coupon ?</span>
                            <span 
                                className="text-gray-400 my-3 block underline cursor-pointer"
                                onClick={handleAddressOption}
                            >
                                Select address
                            </span>
                            <button 
                                className="text-white bg-black px-4 py-2 rounded-lg mb-3"
                                onClick={handleCheckout}
                                >
                                Proceed To Checkout
                            </button>
                        </div>
                </div>
            </div>
            { showAddAddress && <AddAddress isOpen={showAddAddress} onClose={handleShowAddress} /> }
            { showAddressOption && <Modal isOpen={showAddressOption} onClose={handleAddressOption}>
                <ViewAddress selectedId={addressId} setAddressId={setAddressId} onClose={handleAddressOption} isOpen={showAddressOption} />
            </Modal>}
        </div>
    )
}
export {Cart}