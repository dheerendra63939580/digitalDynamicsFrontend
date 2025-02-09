import { Cart } from "./components/Cart";
import { Home } from "./components/Home";
import { ListingPage } from "./pages/ListingPage";
import { ProductPage } from "./pages/Product";

export const routes = [
    {path: "/", element: <Home />},
    {path: "/product/:category/:id", element: <ProductPage/>},
    {path: "/product/:category", element: <ListingPage />},
    {path: "/product/cart", element: <Cart/>},
]