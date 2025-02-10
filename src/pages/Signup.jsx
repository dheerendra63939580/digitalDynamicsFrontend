import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postApi } from '../api';

const Signup = ({setSignup}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Mobile number is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    }),
    onSubmit: async (values) => {
      console.log('Signup data:', values);
      try {
        const res = await postApi('user/signup', values);
        console.log(res)
      } catch(err) {
        console.log(err)
      }
    },
  });

  return (
    <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Sign Up</h1>
      <form onSubmit={formik.handleSubmit} className="w-full">
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="text-lg text-gray-600 mb-2 block">Enter Name</label>
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
            <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="text-lg text-gray-600 mb-2 block">Enter Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        {/* Mobile Input */}
        <div className="mb-4">
          <label htmlFor="mobile" className="text-lg text-gray-600 mb-2 block">Enter Mobile Number</label>
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
            <div className="text-red-500 text-sm mt-1">{formik.errors.mobile}</div>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label htmlFor="password" className="text-lg text-gray-600 mb-2 block">Enter Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="text-lg text-gray-600 mb-2 block">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Enter Password Again"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>
        <div
            className="text-end underline mb-2 cursor-pointer"
            onClick={() => setSignup(false)}
        >
            Have Account
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-3 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export {Signup};
