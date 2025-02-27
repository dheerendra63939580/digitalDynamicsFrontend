import { useEffect, useState } from "react"
import { getApi } from "../api"
import { useSelector } from "react-redux"
import { accessProfile } from "../reduxToolkit/slices/userSlice"

export const Order = () => {
    const profile = useSelector(accessProfile)
    console.log("prof", profile)
    const [orders, setOrders] = useState([])
    useEffect(() =>{ 
        if(profile?.name)
        getOrders() 
    }, [profile?.name]);
    const getOrders = async () => {
        try {
            const res = await getApi(`/user/order/${profile?.id}`)
            // console.log(res)
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div>
            ldjskjflk
        </div>
    )
}