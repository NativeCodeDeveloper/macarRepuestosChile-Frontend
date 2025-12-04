export default function SobreNosotrosCard() {
    return (
        <section className="w-full flex justify-center px-4 py-10 bg-gray-100">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6 md:p-10 transition-all">
                {/* Imagen o avatar opcional estilo Facebook */}
                <div className="w-full flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                        MR
                    </div>
                </div>

                {/* Título */}
                <h2 className="text-center text-3xl font-bold tracking-tight mb-4 text-gray-900">
                    Sobre Nosotros
                </h2>

                {/* Texto */}
                <p className="text-gray-700 text-center leading-relaxed text-base md:text-lg">
                    <strong>Macar Repuestos Chile</strong> es una empresa especialista en vehículos
                    <strong> Maxus</strong>, dedicada exclusivamente a la importación y distribución de
                    <strong> repuestos originales de fábrica</strong>. No trabajamos piezas alternativas;
                    creemos en la calidad, seguridad y durabilidad que solo los repuestos oficiales pueden entregar.
                    <br /><br />
                    Nuestra visión es convertirnos en el <strong>líder latinoamericano</strong> en
                    repuestos Maxus durante los próximos años, entregando soluciones confiables,
                    atención experta y un servicio transparente para clientes de todo Chile y Latinoamérica.
                </p>
            </div>
        </section>
    );
}