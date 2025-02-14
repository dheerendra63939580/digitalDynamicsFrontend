import { useFormik } from "formik";
import close from '../assets/icons/close.png'
export function EditProfile({handleClose}) {
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
    },
  });
  return (
    <div>
      <div className="flex justify-end">
        <img 
            src={close} 
            alt="" 
            className="bg-gray-400  w-10 rounded-lg"
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
          {formik.touched.oldPassword && formik.errors.password && (
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
            id="password"
            name="newPassword"
            placeholder="Enter New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formik.touched.newPassword && formik.errors.password && (
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
            name="newPassword"
            placeholder="Confirm Password"
            value={formik.values.confirmNewPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formik.touched.confirmNewPassword && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.confirmNewPassword}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full p-3 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
        >
          UPDATE
        </button>
      </form>
    </div>
  );
}
