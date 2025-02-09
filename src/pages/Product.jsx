import { useParams } from "react-router-dom"
import { getApi } from "../api"
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { Loading } from "../components/Loading";
import { AddToCart } from "../helper";

const ProductPage = () => {
    const {id, category} = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);
    useEffect(() => {
        getProductInDetail()
    }, [])
    const getProductInDetail = async () => {
        try {
            setLoading(true);
           const res = await getApi(`/product/${id}`);
           setProduct(res?.data?.data);
           setLoading(false)
        } catch(err) {
            console.log(err);
            setLoading(false)
        }
    }
    function increment() {
        setCount(count + 1);
    }
    function decrement() {
        if(count > 1)
            setCount(count - 1);
    }
    
   if(loading)
    return <Loading/>
    return (
        <Card classes="m-auto  lg:w-[80%] flex flex-col gap-6 md:flex-row">
            <div>
                <img src={product?.image} alt="" 
                    className=' h-[500px]'
                />
            </div>
            <div className="bg-blue-100 px-3 py-2 rounded-lg flex flex-col gap-2.5">
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl">{product?.name}</h1>
                    <p className="text-xl">{product?.description}</p>
                    <span 
                    style={{backgroundColor: "hsl(300, 100%, 70%)", color: "hsl(300, 100%, 30%)"}}
                        className="px-4 py-2 rounded-lg"
                    >
                        {product?.price} INR
                    </span>
                </div>
                <ul className="bg-gray-300 px-3 py-2 rounded-lg flex flex-col gap-2">
                    <li className="text-xl">Specifications</li>
                    {Object.entries(product?.specifications || {}).map(([key, value], index) => (
                        <li key={`specification ${index}`}
                            className="flex gap-3 items-center"
                        >
                            <span className="text-lg font-semibold">{key}</span> 
                            <span className="text-gray-500">{value}</span>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <span className="bg-blue-500 px-4 py-2 text-white cursor-pointer text-lg"
                            onClick={increment}
                        >
                            +
                        </span>
                        <span className="bg-white px-4 py-2">{count}</span>
                        <span className="bg-blue-500 px-4 py-2 text-white cursor-pointer text-lg"
                            onClick={decrement}
                        >
                            -
                        </span>
                    </div>
                    <span className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
                        onClick={() => AddToCart(count, product)}
                    >
                        Add To Cart
                    </span>
                </div>
            </div>
        </Card>
    )
}
export {ProductPage};