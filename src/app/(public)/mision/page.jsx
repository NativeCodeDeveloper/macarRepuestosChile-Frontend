
import Image from "next/image";
import Link from "next/link";

export default function MisionMacarCard() {
    return (
        <section className="relative w-full min-h-fit overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl border border-blue-900/10 px-2 sm:px-4 md:px-10 bg-gradient-to-b from-blue-50/60 via-white/60 to-blue-100/60">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/maxus1.jpg"
                    alt="maxusimage"
                    fill
                    className="object-cover object-center w-full h-full scale-105"
                    priority
                />
                {/* Overlay: glassmorphism + gradiente azul corporativo */}
                <div className="pointer-events-none absolute inset-0 w-full h-full bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-white/50 backdrop-blur-[2px]" />
                {/* Detalle decorativo: blob azul */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl z-10" />
            </div>
            {/* Contenido */}
            <div className="relative flex flex-col items-center justify-start w-full pt-8 sm:pt-16 md:pt-24 pb-6 sm:pb-12 md:pb-20 z-20">
                {/* Logo grande solo en desktop, fuera del flujo de las cards */}
                <div className="hidden md:flex justify-center items-center mb-8" style={{minHeight:'80px'}}>
                    <Image src="/logoBlack2.png" alt="logoblck" width={320} height={320} className="h-auto w-[220px] md:w-[320px] mx-auto" />
                </div>
                {/* Logo móvil */}
                <div className="block md:hidden flex justify-center items-center mb-6" style={{minHeight:'60px'}}>
                    <Image src="/logoBlack2.png" alt="logoblck" width={220} height={220} className="h-auto w-[160px] sm:w-[220px] mx-auto" />
                </div>
                <div className="flex flex-col w-full items-center gap-6 sm:gap-10 md:gap-14">

                {/* Card Misión */}
                <div className="w-full max-w-xl md:max-w-2xl rounded-3xl border border-blue-900/15 bg-white/95 backdrop-blur-2xl shadow-2xl p-4 sm:p-8 md:p-14 flex flex-col items-center min-h-[220px] sm:min-h-[300px] md:min-h-[420px] break-words hyphens-auto">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-center mb-6 mt-2 text-blue-900 drop-shadow-xl">
                        <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 bg-clip-text text-transparent">Nuestra Misión</span>
                    </h1>
                    <p className="mt-2 text-center text-base sm:text-lg md:text-xl leading-relaxed text-gray-800 font-semibold drop-shadow-sm">
                        Proveer repuestos originales de fábrica Maxus, a través de la importación directa y una asesoría técnica experta.<br/>
                        Entregamos soluciones confiables y oportunas a clientes de todo Chile y la región.<br/>
                        <span className="text-blue-700 font-bold">Transparencia, respaldo y atención personalizada</span> son nuestro sello, contribuyendo al desarrollo automotriz y relaciones comerciales de largo plazo.
                    </p>
                </div>

                {/* Card Visión */}
                <div className="w-full max-w-xl md:max-w-2xl rounded-3xl border border-blue-900/15 bg-white/95 backdrop-blur-2xl shadow-2xl p-4 sm:p-8 md:p-14 flex flex-col items-center min-h-[220px] sm:min-h-[300px] md:min-h-[420px] break-words hyphens-auto mt-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-center mb-6 mt-2 text-blue-900 drop-shadow-xl">
                        <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 bg-clip-text text-transparent">Nuestra Visión</span>
                    </h2>
                    <p className="mt-2 text-center text-base sm:text-lg md:text-xl leading-relaxed text-gray-800 font-semibold drop-shadow-sm">
                        Ser el líder nacional en repuestos originales Maxus y un referente regional en Latinoamérica.<br/>
                        Destacamos como emprendimiento chileno de la Región de Ñuble, reconocidos por <span className="text-blue-700 font-bold">especialización, confiabilidad y excelencia en el servicio</span>.<br/>
                        Comprometidos con la calidad y seguridad automotriz.
                    </p>
                    <h3 className="mt-8 text-xl sm:text-2xl font-bold text-center text-blue-900">Satisfacción al cliente</h3>
                    <p className="mt-2 text-center text-base sm:text-lg md:text-xl leading-relaxed text-gray-700 font-semibold drop-shadow-sm">
                        En Macar Repuestos Chile, la satisfacción de nuestros clientes es el eje central de nuestro trabajo. Nos comprometemos a entregar productos 100% originales, información clara, asesoría especializada y un servicio eficiente antes, durante y después de cada compra. Medimos nuestro éxito a través de la confianza, fidelización y recomendación de nuestros clientes, asegurando una experiencia comercial seria, segura y de alto estándar.
                    </p>
                </div>
            </div>

                {/* Logo móvil */}
                <div className="block md:hidden flex justify-center items-center mb-6 sm:mb-8" style={{minHeight:'60px'}}>
                    <Image src="/logoBlack2.png" alt="logoblck" width={220} height={220} className="h-auto w-[160px] sm:w-[220px] mx-auto" />
                </div>

                {/* Botón de acción */}
                <Link href="/formularioContacto" className="mt-2 inline-block">
                    <span className="inline-block rounded-full bg-gradient-to-r from-blue-700 to-cyan-400 px-8 py-3 text-lg font-bold text-white shadow-lg hover:scale-105 transition-transform">Contáctanos</span>
                </Link>
            </div>
        </section>
    );
}
