import Image from "next/image";

export default function SobreNosotrosCard() {
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

                {/* Card Sobre Nosotros */}
                <div className="w-full max-w-full md:max-w-3xl rounded-2xl md:rounded-3xl border border-blue-900/20 bg-white/80 backdrop-blur-xl shadow-2xl p-3 sm:p-6 md:p-12 mb-4 flex flex-col items-center min-h-[220px] sm:min-h-[300px] md:min-h-[500px]">
                    <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-center mb-3">
                        <span className="bg-gradient-to-r from-blue-900 via-blue-700 to-cyan-400 bg-clip-text text-transparent drop-shadow-xl">Sobre Nosotros</span>
                    </h2>
                    <p className="mt-1 text-center text-xs sm:text-base md:text-lg leading-relaxed text-blue-900 font-semibold drop-shadow-sm">
                        <span className="font-bold mt-4">Macar Repuestos Chile</span><br/>
                        <br />
                        Macar Repuestos Chile es una empresa chilena, con base en la Región de Ñuble, especializada exclusivamente en vehículos Maxus y dedicada a la importación y distribución de repuestos originales de fábrica.<br/>
                        Nuestra operación se sustenta en un principio fundamental: <span className="text-blue-700 font-bold">no comercializamos piezas alternativas</span>, porque confiamos en la calidad, seguridad y durabilidad que solo los repuestos oficiales pueden garantizar.<br/>
                        <br/>
                        Con una visión estratégica de crecimiento, buscamos consolidarnos como el líder nacional en repuestos Maxus y proyectarnos como un referente regional en Latinoamérica, entregando soluciones confiables, asesoría técnica especializada y un servicio transparente y oportuno a clientes de todo Chile y la región.<br/>
                        <br/>
                        Somos una empresa familiar chilena, originaria de la Región de Ñuble, con trayectoria en el rubro automotriz desde el año 2012, cuando iniciamos nuestras actividades como Automotora Pehuén. A partir de esta experiencia y de un proceso de evolución constante, en 2023 damos origen a Comercializadora Carrasco Macar Ltda., fortaleciendo nuestro enfoque en la especialización, la importación directa y el respaldo técnico.<br/>
                        <br/>
                        En Macar Repuestos Chile, trabajamos con un compromiso permanente hacia la excelencia, aportando valor al mercado automotriz nacional y regional mediante repuestos originales Maxus, atención experta y relaciones comerciales basadas en la confianza y la transparencia.
                    </p>
                </div>

                {/* Logo móvil */}
                <div className="mb-4 sm:mb-6 md:mb-8 block md:hidden">
                    <Image src="/logoBlack2.png" alt="logoblck" width={360} height={360} className="h-auto w-[160px] sm:w-[220px] mx-auto" />
                </div>
            </div>
        </section>
    );
}