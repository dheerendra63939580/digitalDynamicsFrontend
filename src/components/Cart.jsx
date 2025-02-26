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
const Cart = () => {
    const profile = useSelector(accessProfile);
    const navigate = useNavigate()
    const [addressId, setAddressId] = useState("");
    console.log("id", addressId)
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
    if(cartItems?.length === 0)
        return <span>Cart is empty</span>
    const handleCheckout = async () => {
        if(!profile?.name)
            navigate("/login")
        if(!profile?.addresses?.length) {
            handleShowAddress();
            return;
        }
        let payload = [];
        cartItems.forEach(({_id, quantity, price}) => payload.push({_id, quantity, price}))
        try {
            const res = await postApi(`/product/purchase/${profile.id}`, payload);
            toast.success(res.data.message);
            const finalIds = [...res.data.data.failedProducts, ...res.data.data.purchasedProducts]
            const cartItem = cartItems.filter(({ _id }) => !finalIds.includes(_id));
            localStorage.setItem("cartItem", JSON.stringify(cartItem));
            console.log({cartItem})
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
        setshowAddressOption(!showAddressOption)
    }
    return(
        <div className="m-auto  lg:w-[80%]">
            <h1 className="text-xl p-2 mb-2">Cart</h1>
            <div className="flex gap-4 justify-center flex-col md:flex-row">
                    <table className="cart-table bg-gray-100">
                                <thead className="bg-blue-500">
                                    <tr className="py-2">
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Quanitity</th>
                                        <th>Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems?.map((value, index) => (
                                        <tr key={`cart ${index}`}>
                                            <td>
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
                                                <span className="bg-blue-500 px-4 py-2 text-white cursor-pointer text-lg"
                                                    onClick={() => increaseQuantity(value?._id)}
                                                >
                                                    +
                                                </span>
                                                <span className="bg-white px-4 py-2">{value?.quantity}</span>
                                                <span className="bg-blue-500 px-4 py-2 text-white cursor-pointer text-lg"
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
                <div className="border border-gray-400 min-w-[250px] h-fit md:sticky md:top-[133px] ">
                    <h1 className="bg-blue-500 pl-2 py-2">Cart Totals</h1>
                        <div className="px-2">
                            <div className="p-2 border-b-gray-300 border-b-2">
                                <span className="text-gray-600">Sub Total</span> {subTotal}
                            </div>
                            <div className="p-2 border-b-gray-300 border-b-2">
                                <span>Total</span> {subTotal}
                            </div>
                            <span className="text-gray-400 my-3 block">Have a coupon ?</span>
                            <span 
                                className="text-gray-400 my-3 block underline cursor-pointer"
                                onClick={handleAddressOption}
                            >
                                Want to change address
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