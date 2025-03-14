import { useEffect, useState } from "react"
import { deleteApi, getApi } from "../api"
import { useSelector } from "react-redux"
import { accessProfile } from "../reduxToolkit/slices/userSlice"
import { ShowEmpty } from "../components/ShowEmpty"
import { Loader } from "../components/Loader"
import toast from "react-hot-toast"

export const Order = () => {
    const profile = useSelector(accessProfile)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() =>{ 
        if(profile?.name)
        getOrders() 
    }, [profile?.name]);
    const getOrders = async () => {
        try {
            setLoading(true)
            const res = await getApi(`/user/order/${profile?.id}`)
            setOrders(res?.data?.data)
            setLoading(false)
        } catch(err) {
            setLoading(false)
            console.log(err)
        }
    }

    const handleOrderDelete = async (orderId, quantity, productId) => {
        console.log(orderId, quantity, productId)
        try {
                await toast.promise(deleteApi(
                `/product/${productId}`,
                {orderId, quantity, userId: profile?.id}
            ),
            {
                loading: 'Loading',
                success: 'Order cancelled successfully',
                error: (err) => err?.data?.message || "Error occured",
            }
        );
        getOrders()
        } catch(err) {

        }
    }
    
    return loading ? <Loader/> : !orders?.length ? <ShowEmpty>No order found</ShowEmpty> :
        (
        <div className="md:w-[80%] m-auto  bg-white flex gap-2 flex-col sm:flex-row pb-1">
            {orders?.map((value, index) => (
                <div key={`order${index}`} className="flex flex-col gap-2 p-2" style={{boxShadow: "4px 4px 4px rgb(200 200 200)"}}>
                    <span><img src={value?.productId?.image} alt="" className="object-cover h-[300px] w-full"/></span>
                    <div className="flex gap-2 items-center justify-between">
                        <span className="text-lg">{value?.productId?.name}</span>
                        <span 
                            className="bg-red-950 px-2 py-1 text-white rounded-lg cursor-pointer"
                            onClick={() => handleOrderDelete(value?._id, value?.quantity, value?.productId?._id)}
                        >
                            Cancel
                        </span>
                    </div>
                    <span>{value?.status}</span>
                    <span>Order Date: {value?.date}</span>
                    <span>Quantity: {value?.quantity}</span>
                    <strong>Shipping Address</strong>
                    <div className="flex flex-col gap-1">
                        <span>{value?.address?.fullName}</span>
                        <span>{value?.address?.phone}</span>
                        <span>
                            {value?.address?.street}, {value?.address?.city}, {value?.address?.state}, {value?.address?.postalCode}, {value?.address?.country}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
}