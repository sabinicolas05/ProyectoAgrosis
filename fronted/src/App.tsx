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
import TipoInsumosList from "./pages/inventario/tipo_insumo/TipoInsumoGet";
import InsumosList from "./pages/inventario/insumo/InsumoGet";
import InventarioList from "./pages/inventario/inventarios/InventarioGet";

 {/* 🔹 FINANZAS */}
 import PagoList from "./pages/finanzas/pago/PagoGet";
 import ProduccionList from "./pages/finanzas/produccion/ProduccionGet";
 import ResiduosList from "./pages/finanzas/residuo/ResiduoGet";
 import VentasList from "./pages/finanzas/ventas/VentasGet";

 {/* 🔹 IOT */}
 import SensorConfigForm from "@/pages/sensor/configuracion/ConfigsensorGet";
 import TipoSensoresList from "./pages/sensor/tipo_sensor/TipoSensorGet";
 import SensorForm from "./pages/sensor/SensorGet";



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
         <Route element={<TipoInsumosList/>} path="/inventario/tipo_insumo" />
         <Route element={<InsumosList/>} path="/inventario/insumo" />
         <Route element={<InventarioList/>} path="/inventario/inventario" />

         {/* 🔹 FINANZAS */}
         <Route element={<PagoList/>} path="/finanzas/pagos" />
         <Route element={<ProduccionList/>} path="/finanzas/produccion" />
         <Route element={<ResiduosList/>} path="/finanzas/residuos" />
         <Route element={<VentasList/>} path="/finanzas/venta" />

         {/* 🔹 IOT */}
         <Route element={<SensorConfigForm />} path="/iot/configuracion" />
         <Route element={<TipoSensoresList />} path="/iot/tipo-sensor" />
         <Route element={<SensorForm />} path="/iot/sensores" />




          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<AboutPage />} path="/about" />
        </Route>
      </Routes>
    </>
  );
}


export default App;

