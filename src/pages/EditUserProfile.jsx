import { useFormik } from "formik";
import close from '../assets/icons/close.png'
import { useSelector } from "react-redux";
import { accessProfile } from "../reduxToolkit/slices/userSlice";
import * as Yup from 'yup'
import { useState } from "react";
import { patchApi } from "../api";
import { Loading } from "../components/Loading";
export function EditProfile({handleClose}) {
  const profile = useSelector(accessProfile);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false)
  const formik = useFormik({
    initialValues: {
      name: profile?.name,
      mobile: profile?.mobile,
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
          name: Yup.string().required('Name is required'),
          mobile: Yup.string()
            .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
            .required('Mobile number is required'),
          oldPassword: isUpdatePassword ? Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required') : Yup.string().nullable(),
          newPassword: isUpdatePassword ? Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required') : Yup.string().nullable(), 
          confirmNewPassword: isUpdatePassword ? Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
            .required('Confirm Password is required') : Yup.string().nullable(),
        }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      let payload;
      if(isUpdatePassword) {
        payload = {...values, isUpdatePassword, id: profile.id}
      } else {
        payload = {mobile: values.mobile, name: values.name, isUpdatePassword, id: profile.id}
      }
      try {
        const res = await patchApi("user/update_profile", payload);
        console.log(res)
        handleClose()
      } catch(err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="max-h-screen overflow-auto px-4 py-2">
      <div className="flex justify-end">
        <img 
            src={close} 
            alt="" 
            className="bg-gray-400  w-10 rounded-lg cursor-pointer"
            onClick={handleClose}
        />
      </div>
      <form onSubmit={formik.handleSubmit} className="flex flex-col justify-between">
        <div className="mb-4">
          <label htmlFor="name" className="text-lg text-gray-600 mb-2 block">
            Enter Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.name}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="text-lg text-gray-600 mb-2 block">
            Enter Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            placeholder="Enter Mobile Number"
            value={formik.values.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formik.touched.mobile && formik.errors.mobile && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.mobile}
            </div>
          )}
        </div>
        <div className="mb-4 flex gap-3">
          <input 
            type="checkbox"
            checked={isUpdatePassword}
            onChange={() => setIsUpdatePassword(!isUpdatePassword)}          
          />
          <label htmlFor="isUpdatePassword">Update Password</label>
        </div>
        {isUpdatePassword && <div>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="text-lg text-gray-600 mb-2 block"
            >
              Enter Password
            </label>
            <input
              type="password"
              id="oldPassword"
              name="oldPassword"
              placeholder="Enter Old Password"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {formik.touched.oldPassword && formik.errors.oldPassword && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.oldPassword}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="text-lg text-gray-600 mb-2 block"
            >
              Enter New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter New Password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.newPassword}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmNewPassword"
              className="text-lg text-gray-600 mb-2 block"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirm Password"
              value={formik.values.confirmNewPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.confirmNewPassword}
              </div>
            )}
          </div>
        </div> }
        <button
          type="submit"
          className="w-full flex items-center justify-center p-3 text-lg text-white text-center bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
        >
          {profile.loading ? <Loading/> : "UPDATE"}
        </button>
      </form>
    </div>
  );
}
