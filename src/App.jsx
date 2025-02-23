import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./AllRoutes";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { accessProfile } from "./reduxToolkit/slices/userSlice";
import { ViewAddress } from "./pages/addresses/ViewAddress";

function App() {
  const profile = useSelector(accessProfile);
  if(profile?.name || localStorage.getItem("token"))
    routes.push({path: "/address", element: <ViewAddress/>})
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<Layout />}>
          {routes?.map((item) => (
            <Route path={item?.path} element={item?.element} key={item?.path} />
          ))}
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: '',
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: '#363636',
            color: '#fff',
          },

          // Default options for specific types
          success: {
            duration: 3000,
            iconTheme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
    </>
  )
}
export default App;