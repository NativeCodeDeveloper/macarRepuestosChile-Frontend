// app/page.jsx
import Portada from "@/app/(public)/portada/page";
import Catalogo from "@/app/(public)/catalogo/page";
import { Case1 } from "@/Componentes/carruselMarcas";



export default function Home() {


    return (
        <main>
            <Portada></Portada>
            <Case1 />
            <Catalogo></Catalogo>



        </main>
    );
}