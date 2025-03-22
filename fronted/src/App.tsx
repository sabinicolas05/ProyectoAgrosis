import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndexPage from "@/pages/index";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

{/* 🔹 Inventario */}
import TipoHerramientasList from "./pages/inventario/tipo_herramientas/TipoHerramientaGet";
import HerramientasList from "./pages/inventario/herramientas/HerramientaGet";


import LoginForm from "@/pages/login";
import RegisterForm from "./pages/register";



function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
      
        <Route element={<LoginForm />} path="/" />

        
        <Route
          element={
              <Outlet />
          }
        >
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<IndexPage />} path="/inicio" />
         
         {/* 🔹 Inventario */}
         <Route element={<TipoHerramientasList/>} path="/inventario/tipo_herramienta" />
         <Route element={<HerramientasList/>} path="/inventario/herramientas" />


          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<AboutPage />} path="/about" />
        </Route>
      </Routes>
    </>
  );
}


export default App;

