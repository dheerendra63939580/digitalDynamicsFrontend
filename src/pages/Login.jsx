import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from "yup"
import { Signup } from './Signup';
const Login = () => {
  const [isSignup, setIsSignup] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      }),
    onSubmit: (values) => {
      console.log('Login data', values);
    },
  });

  return (
    <>
        <div className={`flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto mt-16 ${isSignup && "hidden"}`}>
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Login</h1>
        <form onSubmit={formik.handleSubmit} className="w-full">
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
            {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
            </div>

            <div className="mb-6">
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
            {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
            </div>
            <div 
                className="text-end mb-2 underline cursor-pointer"
                onClick={() => setIsSignup(true)}
            >
                {"Don't"} Have Account
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full p-3 text-lg text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                >
                    Login
                </button>
            </div>
        </form>
        </div>
        {isSignup && <Signup setSignup={setIsSignup}/>}
    </>
  );
};

export {Login};
