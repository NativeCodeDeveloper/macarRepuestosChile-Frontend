
import Image from "next/image";
import Link from "next/link";

export default function MisionMacarCard() {
    return (
        <section className="relative w-full min-h-screen overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-blue-900/10">
            {/* Imagen de fondo */}
            <Image
                src="/maxus1.jpg"
                alt="maxusimage"
                width={1230}
                height={1200}
                className="w-full min-h-full h-full object-cover object-center scale-105"
                priority
            />

            {/* Overlay: glassmorphism + gradiente azul corporativo */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-900/70 via-blue-800/40 to-white/80 backdrop-blur-[2px]" />

            {/* Detalle decorativo: blob azul */}
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl z-10" />

            {/* Contenido */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-2 sm:px-4 md:px-10 pt-20 pb-6 sm:pb-10 md:pb-14 z-20">
                {/* Logo grande solo en desktop */}
                <div className="mb-4 sm:mb-6 md:mb-8 hidden md:block">
                    <Image src="/logoBlack2.png" alt="logoblck" width={360} height={360} className="h-auto w-[220px] md:w-[320px] mx-auto" />
                </div>

                {/* Card Misión */}
                <div className="w-full max-w-full md:max-w-3xl rounded-2xl md:rounded-3xl border border-blue-900/20 bg-white/80 backdrop-blur-xl shadow-2xl p-3 sm:p-6 md:p-12 mb-4 flex flex-col items-center min-h-[220px] sm:min-h-[300px] md:min-h-[500px] px-2 sm:px-6 md:px-12">
                    <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-center mb-3">
                        <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">Nuestra Misión</span>
                    </h1>
                    <p className="mt-1 text-center text-sm sm:text-base md:text-lg leading-relaxed text-blue-900 font-semibold drop-shadow-sm">
                        Proveer repuestos originales de fábrica Maxus, a través de la importación directa y una asesoría técnica experta.
                        Entregamos soluciones confiables y oportunas a clientes de todo Chile y la región.<br/>
                        <span className="text-blue-700 font-bold">Transparencia, respaldo y atención personalizada</span> son nuestro sello, contribuyendo al desarrollo automotriz y relaciones comerciales de largo plazo.
                    </p>
                </div>

                {/* Card Visión */}
                <div className="w-full max-w-full md:max-w-3xl rounded-2xl md:rounded-3xl border border-blue-900/20 bg-white/80 backdrop-blur-xl shadow-2xl p-3 sm:p-6 md:p-12 mb-4 flex flex-col items-center min-h-[220px] sm:min-h-[300px] md:min-h-[500px] px-2 sm:px-6 md:px-12">
                    <h2 className="text-lg sm:text-2xl md:text-4xl font-black tracking-tight text-center mb-3">
                        <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">Nuestra Visión</span>
                    </h2>
                    <p className="mt-1 text-center text-sm sm:text-base md:text-lg leading-relaxed text-blue-900 font-semibold drop-shadow-sm">
                        Ser el líder nacional en repuestos originales Maxus y un referente regional en Latinoamérica.<br/>
                        Destacamos como emprendimiento chileno de la Región de Ñuble, reconocidos por <span className="text-blue-700 font-bold">especialización, confiabilidad y excelencia en el servicio</span>.<br/>
                        Comprometidos con la calidad y seguridad automotriz.
                    </p>
                    <br />
                    <h3 className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">Satisfacción al cliente</h3>
                    <p className="plasholder:mt-1 text-center text-sm sm:text-base md:text-lg leading-relaxed text-gray-500 font-semibold drop-shadow-sm">
                        En Macar Repuestos Chile, la satisfacción de nuestros clientes es el eje central de nuestro trabajo. Nos comprometemos a entregar productos 100% originales, información clara, asesoría especializada y un servicio eficiente antes, 
                        durante y después de cada compra. Medimos nuestro éxito a través de la confianza, fidelización y recomendación de nuestros clientes, asegurando una experiencia comercial seria, segura y de alto estándar.
                    </p>
                </div>

                {/* Logo móvil */}
                <div className="mb-4 sm:mb-6 md:mb-8 block md:hidden">
                    <Image src="/logoBlack2.png" alt="logoblck" width={360} height={360} className="h-auto w-[160px] sm:w-[220px] mx-auto" />
                </div>

                {/* Botón de acción */}
                <Link href="/formularioContacto" className="mt-2 inline-block">
                    <span className="inline-block rounded-full bg-gradient-to-r from-blue-700 to-cyan-400 px-8 py-3 text-lg font-bold text-white shadow-lg hover:scale-105 transition-transform">Contáctanos</span>
                </Link>
            </div>
        </section>
    );
}
