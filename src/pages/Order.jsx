import { useEffect, useState } from "react"
import { getApi } from "../api"
import { useSelector } from "react-redux"
import { accessProfile } from "../reduxToolkit/slices/userSlice"
import { ShowEmpty } from "../components/ShowEmpty"

export const Order = () => {
    const profile = useSelector(accessProfile)
    const [orders, setOrders] = useState([])
    useEffect(() =>{ 
        if(profile?.name)
        getOrders() 
    }, [profile?.name]);
    const getOrders = async () => {
        try {
            const res = await getApi(`/user/order/${profile?.id}`)
            setOrders(res?.data?.data)
        } catch(err) {
            console.log(err)
        }
    }
    if(!orders?.length)
        return (
            <ShowEmpty>
                No order found
            </ShowEmpty>
    )
    return (
        <div className="md:w-[80%] m-auto  bg-white flex gap-2 flex-col sm:flex-row pb-1">
            {orders?.map((value, index) => (
                <div key={`order${index}`} className="flex flex-col gap-2 p-2" style={{boxShadow: "4px 4px 4px rgb(200 200 200)"}}>
                    <span><img src={value?._id?.image} alt="" className="object-cover h-[300px] w-full"/></span>
                    <span className="text-lg">{value?._id?.name}</span>
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