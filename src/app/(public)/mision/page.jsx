export default function MisionMacarCard() {
    return (
        <section className="w-full flex justify-center px-4 py-10 bg-gray-100">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6 md:p-10">
                {/* Avatar / Icono estilo Facebook */}
                <div className="w-full flex justify-center mb-4">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200 flex items-center justify-center text-lg md:text-xl font-bold text-gray-700">
                        MR
                    </div>
                </div>

                {/* Título */}
                <h2 className="text-center text-2xl md:text-3xl font-bold tracking-tight mb-4 text-gray-900">
                    Nuestra Misión
                </h2>

                {/* Párrafo principal */}
                <p className="text-gray-700 text-center leading-relaxed text-sm md:text-base mb-6">
                    En <strong>Macar Repuestos Chile</strong> nuestra misión es entregar soluciones
                    confiables y especializadas en la adquisición de{" "}
                    <strong>repuestos originales de fábrica para vehículos Maxus</strong>, garantizando
                    siempre la calidad, seguridad y durabilidad que cada cliente y cada flota necesitan.
                </p>

                {/* Lista de compromisos */}
                <div className="space-y-4 text-sm md:text-base text-gray-800">
                    <div className="flex gap-3">
                        <span className="mt-1 text-base">✅</span>
                        <p>
                            <strong>Distribución exclusiva de repuestos 100% originales:</strong> sólo
                            trabajamos con componentes certificados de fábrica, sin repuestos alternativos
                            ni imitaciones.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <span className="mt-1 text-base">✅</span>
                        <p>
                            <strong>Ser el aliado estratégico de talleres, empresas y particulares:</strong>{" "}
                            brindando asesoría técnica experta, respuesta rápida y disponibilidad constante
                            de repuestos Maxus.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <span className="mt-1 text-base">✅</span>
                        <p>
                            <strong>Elevar el estándar de confianza en el mercado automotriz:</strong> con
                            transparencia, responsabilidad y cumplimiento en cada venta y cada entrega.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <span className="mt-1 text-base">✅</span>
                        <p>
                            <strong>Mejora continua y expansión regional:</strong> optimizando logística e
                            importación para posicionarnos como el <strong>referente latinoamericano</strong>{" "}
                            en repuestos Maxus durante los próximos años.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}