import { useState } from "react";
import { AddAddress } from "./AddAddress";
import { useSelector } from "react-redux";
import { accessProfile } from "../../reduxToolkit/slices/userSlice";
import toast from "react-hot-toast";
import { deleteApi } from "../../api";
import { useGetProfile } from "../../customHooks/useGetProfile";

export function ViewAddress() {
    const profile = useSelector(accessProfile)
    const {getProfile} = useGetProfile()
    const [addAddress, setAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    const [initialValues, setInitialValues] = useState({});
    const deleteAddress = async (addressId) => {
        try {
           await toast.promise(
                deleteApi(`/user/delete_address/${profile?.id}/${addressId}`),
                {
                    loading: 'Loading',
                    success: 'Address deleted successfully',
                    error: 'Error occured',
                }
            )
            getProfile()
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div className="bg-white m-auto p-4 lg:w-[80%]">
            <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
                <h1 className="text-2xl">Your Addresses</h1>
                <span 
                    style={{backgroundColor: "hsla(120, 50%, 50%, .4)", color: "hsla(120, 50%, 50%, 1)"}}
                    className="rounded-lg px-4 py-2 cursor-pointer"
                    onClick={() => setAddAddress(true)}
                >
                    Add New Address
                </span>
            </div>
            <hr />
           {profile?.addresses?.map((value, index) =>  (
            <div className="flex flex-col gap-1 mt-3" key={`viewAddress${index + 1}`}>
                <h1>{value?.fullName}</h1>
                <span>
                    {value?.street}, {value?.city}, {value?.state} 227411
                    {}
                </span>
                <span>{value?.country}</span>
                <span>Phone Number: {value?.phone}</span>
                <div className="flex gap-2 mb-2">
                    <span 
                        style={{backgroundColor: "hsla(240, 50%, 50%, .4)", color: "hsla(240, 50%, 50%, 1)"}}
                        className="px-3 py-2 rounded-lg cursor-pointer"
                        onClick={() => {setEditAddress(true); setInitialValues(value)}}
                    >
                            Edit
                        </span>
                    <span 
                        style={{backgroundColor: "hsla(0, 50%, 50%, .4)", color: "hsla(0, 50%, 50%, 1)"}}
                        className="px-3 py-2 rounded-lg cursor-pointer"
                        onClick={() => deleteAddress(value?._id)}
                        >
                            Remove
                    </span>
                </div>
                <hr />
            </div>)) }
            {addAddress && <AddAddress isOpen={addAddress} onClose={() => setAddAddress(false)}/> }
            {editAddress && <AddAddress isOpen={editAddress} onClose={() => setEditAddress(false)} initialValues={initialValues}/> }
        </div>
    )
}