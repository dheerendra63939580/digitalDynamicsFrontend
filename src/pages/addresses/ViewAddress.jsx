import { useState } from "react";
import { AddAddress } from "./AddAddress";
import { useSelector } from "react-redux";
import { accessProfile } from "../../reduxToolkit/slices/userSlice";

export function ViewAddress() {
    const profile = useSelector(accessProfile)
    const [addAddress, setAddAddress] = useState(false);
    const [editAddress, setEditAddress] = useState(false);
    return (
        <div className="bg-white m-auto p-4 lg:w-[80%]">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h1 className="text-2xl">Your Addresses</h1>
                <span 
                    style={{backgroundColor: "hsla(120, 50%, 50%, .4)", color: "hsla(120, 50%, 50%, 1)"}}
                    className="rounded-lg px-4 py-2 cursor-pointer"
                    onClick={() => setAddAddress(true)}
                >
                    Add New Address
                </span>
            </div> {console.log(profile)}
           {profile?.addresses?.map(value =>  (<div className="flex flex-col gap-1">
                <h1>Name</h1>
                <span>
                    Street Address, City, State 227411
                </span>
                <span>Country</span>
                <span>Phone Number: </span>
                <div className="flex gap-2">
                    <span 
                        style={{backgroundColor: "hsla(240, 50%, 50%, .4)", color: "hsla(240, 50%, 50%, 1)"}}
                        className="px-3 py-2 rounded-lg cursor-pointer"
                    >
                            Edit
                        </span>
                    <span 
                        style={{backgroundColor: "hsla(0, 50%, 50%, .4)", color: "hsla(0, 50%, 50%, 1)"}}
                        className="px-3 py-2 rounded-lg cursor-pointer"
                        >
                            Remove
                    </span>
                </div>
                <hr />
            </div>)) }
            {addAddress && <AddAddress isOpen={addAddress} onClose={() => setAddAddress(false)}/> }
        </div>
    )
}