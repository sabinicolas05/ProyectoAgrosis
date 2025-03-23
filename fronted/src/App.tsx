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



          
          {/* <Route element={<SensorConfigForm />} path="/iot/configuracion" /> */}
          {/* <Route element={<SensorForm />} path="/iot/sensores" />
          <Route element={<TipoSensoresList />} path="/iot/tipo-sensor" />
          <Route element={<TipoEspecieForm />} path="cultivo/tipoespecie/" />
          <Route element={<EspecieForm />} path="cultivo/especies/" />
          <Route element={<LoteForm />} path="cultivo/lotes/" />
          <Route element={<SemilleroForm />} path="/semilleros" />
          <Route element={<CultivoForm />} path="/cultivo/cultivo" />
          <Route element={<BancalesList />} path="/cultivo/bancal" />
          <Route element={<ActividadForm />} path="/cultivo/actividades" />
          <Route element={<SemillerosList />} path="/cultivo/actividades" />

          
          {/* 🔹 INVENTARIO */}
          {/* <Route element={<HerramientasList/>} path="/inventario/herramientas" />
          <Route element={<InventarioList/>} path="/inventario/inventario" />
          <Route element={<TipoHerramientasList/>} path="/inventario/tipo_herramienta" />
          <Route element={<TipoInsumosList/>} path="/inventario/tipo_insumo" />
          <Route element={<InsumosList/>} path="/inventario/insumo" /> */}

           {/* 🔹 FINANZAS */}
           {/* <Route element={<PagoList/>} path="/finanzas/pagos" />
           <Route element={<ProduccionList/>} path="/finanzas/produccion" />
           <Route element={<ResiduosList/>} path="/finanzas/residuos" />
           <Route element={<VentasList/>} path="/finanzas/venta" /> */}



{/* 


          <Route element={<UsuariosList />} path="/usuarios" />
          <Route element={<EditarUsuarioModal />} path="/usuarios/editar/:id" />
          <Route element={<RegisterUserModal/>} path="/usuarios/editar/:id" />  */}
          <Route element={<UsuariosList />} path="/usuarios" />
          <Route element={<PricingPage />} path="/pricing" />
          <Route element={<BlogPage />} path="/blog" />
          <Route element={<AboutPage />} path="/about" />
        </Route>
      </Routes>
    </>
  );
}


export default App;
