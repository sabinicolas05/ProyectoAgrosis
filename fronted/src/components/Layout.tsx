import Navbar from "@/components/Navbar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar siempre visible */}
      <Navbar />
      {/* Contenido dinámico */}
      <main className="flex-1 p-4">{children}
        
      </main>
    </div>
  );
}
