import { useState } from "react";
import "./Cart.css"
const Cart = () => {
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
    return(
        <div className="m-auto  lg:w-[80%]">
            <h1 className="text-xl p-2 mb-2">Cart</h1>
            <div className="flex gap-4 justify-between flex-col md:flex-row">
                <div className="overflow-scroll">
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
                                                <div className="grid grid-cols-2 gap-2 items-center">
                                                    <img src={value?.image} alt="" className="w-24 aspect-square sm:object-contain" />
                                                    <span>{value?.description}</span>
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
                            <span className="text-gray-400 my-3 block">Have a coupon ?</span>
                            <button className="text-white bg-black px-4 py-2 rounded-lg mb-3">Proceed To Checkout</button>
                        </div>
                </div>
            </div>
        </div>
    )
}
export {Cart}