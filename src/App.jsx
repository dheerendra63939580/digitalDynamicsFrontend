import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { routes } from "./AllRoutes";
import { Layout } from "./components/Layout";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
  <Route path="/login" element={<Login />} />
  
  {/* Wrap all routes inside Layout */}
  <Route element={<Layout />}>
    {routes?.map((item) => (
      <Route path={item?.path} element={item?.element} key={item?.path} />
    ))}
  </Route>

  <Route path="*" element={<h1>404 Not Found</h1>} />
</Routes>
    </>
  )
}
export default App;