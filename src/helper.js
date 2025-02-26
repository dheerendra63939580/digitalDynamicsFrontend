import toast from "react-hot-toast";

export const AddToCart = (quantity, item, notification=false) => {
    const product = JSON.parse(JSON.stringify(item))
    product.quantity = quantity;
    console.log(product)
    const cartItems = JSON.parse(localStorage.getItem("cartItem") || "[]");
    const existingItem = cartItems.find(((value) => value?._id === product?._id));
    if(existingItem)
        existingItem.quantity = existingItem?.quantity + quantity;
    else
        cartItems.push(product);
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
    notification && toast.success("Product added to cart");
}