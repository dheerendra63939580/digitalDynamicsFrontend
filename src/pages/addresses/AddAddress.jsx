import { useFormik } from "formik";
import { Modal } from "../../Modal";
import { addressSchema } from "../../yup";
import { useSelector } from "react-redux";
import { accessProfile } from '../../reduxToolkit/slices/userSlice'
import { postApi } from '../../api'
export function AddAddress({ isOpen, onClose }) {
    const profile = useSelector(accessProfile)
    const formik = useFormik({
        initialValues: {
            fullName: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            postalCode: "",
            country: ""
        },
        validationSchema: addressSchema,
        onSubmit: async (values) => {
            try {
                const res = postApi(`/user/add_address/${profile?.id}`, values);
                console.log(res);
            } catch(err) {
                console.log(err)
            }
        }
    })
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add New Address</h2>

                {/* Address Form */}
                <form onSubmit={formik.handleSubmit} className="space-y-4">

                    {/* Full Name */}
                    <div>
                        <label htmlFor="fullName" className="text-lg text-gray-600 block mb-1">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter Full Name"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label htmlFor="phone" className="text-lg text-gray-600 block mb-1">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter Phone Number"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                        )}
                    </div>

                    {/* Street Address */}
                    <div>
                        <label htmlFor="street" className="text-lg text-gray-600 block mb-1">Street Address</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            placeholder="Enter Street Address"
                            value={formik.values.street}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        {formik.touched.street && formik.errors.street && (
                            <div className="text-red-500 text-sm mt-1">{formik.errors.street}</div>
                        )}
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="text-lg text-gray-600 block mb-1">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Enter City"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {formik.touched.city && formik.errors.city && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="state" className="text-lg text-gray-600 block mb-1">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Enter State"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {formik.touched.state && formik.errors.state && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.state}</div>
                            )}
                        </div>
                    </div>

                    {/* Postal Code & Country */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="postalCode" className="text-lg text-gray-600 block mb-1">Postal Code</label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                placeholder="Enter Postal Code"
                                value={formik.values.postalCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {formik.touched.postalCode && formik.errors.postalCode && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.postalCode}</div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="country" className="text-lg text-gray-600 block mb-1">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                placeholder="Enter Country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {formik.touched.country && formik.errors.country && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.country}</div>
                            )}
                        </div>
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Save Address
                    </button>
                </form>
            </div>
        </Modal>
    )
} 