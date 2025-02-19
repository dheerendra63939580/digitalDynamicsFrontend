import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from "yup"
import { postApi } from '../api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("token"))
      navigate("/")
  }, [])
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
      }),
    onSubmit: async (values) => {
      try {
        const res = await postApi("/user/login", values)
        toast.success(res?.data?.message || "Logged in successfully")
        localStorage.setItem("token", res?.data?.data?.token);
        navigate("/")
      } catch(err) {
        toast.error(err.data.message)
        console.log(err)
      }
    },
  });

  return (
    <div className="bg-blue-400 min-h-screen p-2">
        <div className={`flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto`}>
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
                onClick={() => navigate("/signup")}
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
    </div>
  );
};

export {Login};
