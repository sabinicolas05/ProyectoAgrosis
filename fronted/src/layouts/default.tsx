import { useState } from "react";
import Navbar from "@/components/navbar";
import { Header } from "@/components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative flex h-screen">
      <Navbar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-col flex-grow transition-all duration-1300" style={{ marginLeft: isSidebarOpen ? "250px" : "70px" }}>
        <Header isSidebarOpen={isSidebarOpen} />
        <main className="container mx-auto max-w-7xl px-6 flex-grow pt-20">

          {/* 🔹 Contenido de la página */}
          {children}
        </main>
      </div>
    </div>
  );
}

//npm install react-bootstrap bootstrap
