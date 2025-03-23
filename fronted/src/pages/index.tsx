import DefaultLayout from "@/layouts/default";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "@/hooks/auth/useAuth";

export default function IndexPage() {
  useAuth()
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <h1 className="text-2xl font-bold">Agrosis</h1>
        <h2 className="text-2xl font-bold">Bienvenido al inicio</h2>


        {/* 🔹 Carrusel de imágenes */}
        <div className="w-full max-w-3xl">
<Carousel className="w-full max-w-[140%] mx-auto">
  <Carousel.Item interval={5000}>
    <img className="w-full h-[300px] object-cover rounded-3xl" src="/src/assets/slide01.jpg" alt="First slide" />
  </Carousel.Item>
  <Carousel.Item interval={5000}>
    <img className="w-full h-[300px] object-cover rounded-3xl" src="/src/assets/slide02.jpg" alt="Second slide" />
  </Carousel.Item>
  <Carousel.Item interval={6000}>
    <img className="w-full h-[300px] object-cover rounded-3xl" src="/src/assets/slide03.jpg" alt="Third slide" />
  </Carousel.Item>
</Carousel>
        </div>

      </section>
    </DefaultLayout>
  );
}
