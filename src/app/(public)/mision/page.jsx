import Image from "next/image"


export default function MisionMacarCard() {
    return (
        <section className="relative w-full overflow-hidden rounded-3xl">
            {/* Imagen de fondo */}
            <Image
                src="/maxus1.jpg"
                alt="maxusimage"
                width={1230}
                height={810}
                className="w-full h-[520px] md:h-[620px] object-cover"
                priority
            />

            {/* Overlay: oscurece + degrada a blanco (look pro) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-white"></div>

            {/* Contenido */}
            <div className="absolute inset-0 flex flex-col items-center justify-end px-4 sm:px-6 md:px-10 pb-8 sm:pb-10 md:pb-14">
                <div className="mb-4 sm:mb-6 md:mb-8">
                    <Image src="/logoBlack2.png" alt="logoblck" width={360} height={360} className="h-auto w-[160px] sm:w-[220px] md:w-[320px]  block md:hidden" />
                </div>

                <div className="w-full max-w-4xl rounded-2xl border border-white/40 bg-white/75 backdrop-blur-md shadow-xl p-4 sm:p-6 md:p-10 mb-4 ">
                    <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 text-center ">
                        Nuestra Misión
                    </h1>
                    <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-gray-800 font-semibold text-center">
                        Proveer repuestos originales de fábrica Maxus, a través de la importación directa y una asesoría técnica experta, entregando soluciones confiables y oportunas a clientes de todo Chile y la región. Trabajamos con un enfoque en la transparencia, el respaldo y la atención personalizada, contribuyendo al desarrollo del parque automotriz y fortaleciendo relaciones comerciales de largo plazo.
                    </p>
                </div>

                {/* Visión */}
                <div className="w-full max-w-4xl rounded-2xl border border-white/40 bg-white/75 backdrop-blur-md shadow-xl p-4 sm:p-6 md:p-10 mb-4">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-gray-900 text-center">
                        Nuestra Visión
                    </h2>
                    <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-gray-800 font-semibold text-center">
                        Ser el referente nacional en repuestos originales Maxus, reconocidos por nuestra excelencia en servicio, innovación y compromiso con la satisfacción del cliente, contribuyendo al desarrollo sustentable del sector automotriz en Chile.
                    </p>
                </div>

                <div className="mb-4 sm:mb-6 md:mb-8">
                    <Image src="/logoBlack2.png" alt="logoblck" width={360} height={360} className="h-auto w-[160px] sm:w-[220px] md:w-[320px]  block md:hidden" />
                </div>
            </div>
        </section>
    );
}
