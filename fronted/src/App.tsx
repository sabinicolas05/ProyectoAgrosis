import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import IndexPage from "@/pages/index";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import LoginForm from "@/pages/auth/login";
import RegisterForm from "./pages/auth/register";
import UsuariosList from "./pages/user/UsersGet";
import TipoEspecieForm   from "./pages/trazabilidad/tipo_especie/tipo_especie_Get";
import EspecieForm from "./pages/trazabilidad/especie/EspecieGet";
import LoteForm from "./pages/trazabilidad/lote/LoteGet";
import SemilleroForm from "./pages/trazabilidad/semillero/SemilleroGet";
import CultivoForm from "./pages/trazabilidad/cultivo/CultivoGet";
import ActividadForm from "./pages/trazabilidad/actividad/ActividadGet";
import BancalesList from "./pages/trazabilidad/bancal/BancalGet";
import SemillerosList from "./pages/trazabilidad/semillero/SemilleroGet";
import TipoPlagaList from "./pages/trazabilidad/tipo_plaga/TipoPlagaGet";
import PlagasList from "./pages/trazabilidad/plaga/PlagaGet";

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

        {/* 🔹 Login sin Navbar */}
        <Route element={<LoginForm />} path="/" />

        {/* 🔹 Rutas protegidas con Navbar */}
        <Route
          element={
              <Outlet />
          }
        >
          <Route element={<RegisterForm />} path="/register" />
          <Route element={<IndexPage />} path="/inicio" />

          {/* 🔹 TRAZABILIDAD */}
          <Route element={<TipoEspecieForm />} path="cultivo/tipoespecie/" />
          <Route element={<EspecieForm />} path="cultivo/especies/" />
          <Route element={<LoteForm />} path="cultivo/lotes/" />
          <Route element={<SemilleroForm />} path="/semilleros" />
          <Route element={<CultivoForm />} path="/cultivo/cultivo" />
          <Route element={<BancalesList />} path="/cultivo/bancal" />
          <Route element={<ActividadForm />} path="/cultivo/actividades" />
          <Route element={<SemillerosList />} path="/cultivo/actividades" />
          <Route element={<TipoPlagaList />} path="/plagas/tipo_plaga" />
          <Route element={<PlagasList />} path="/plagas/plaga" />
          <Route element={<UsuariosList />} path="/usuarios" />

         
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

