"use client"
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import maxusBg from "../../../../public/maxus2.webp";
import Link from "next/link";
import {Outfit} from "next/font/google";

const outfit = Outfit({
    subsets:["latin"],
    weight:["900"]
});

export default function Portada() {

    const [titleNumber, setTitleNumber] = useState(0);
    // Convertimos los títulos a objetos para poder asignar color permanente a cada uno
    const titles = useMemo(
        () => [
            { text: "Especialistas en Maxus", color: "text-blue-600" },
            { text: "Repuestos Originales", color: "text-blue-600" },
            { text: "Maxima Calidad", color: "text-blue-600" },
            { text: "Garantía real", color: "text-blue-600" },
            { text: "Repuestos Certificados", color: "text-blue-600" },
        ],
        []
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (titleNumber === titles.length - 1) {
                setTitleNumber(0);
            } else {
                setTitleNumber(titleNumber + 1);
            }
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);


    return(
        <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-50/30 via-transparent to-blue-100/30 overflow-hidden">

            {/* ========== IMAGEN DE FONDO VISIBLE ========== */}
            {/* Contenedor posicionado para que Next/Image con `fill` funcione correctamente. */}
            {/* Usamos z-0 aquí y z-10 en el contenido para evitar dependencias de clases Tailwind negativas como `-z-10`. */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                {/* Next/Image con `fill` se posiciona de forma absoluta respecto a su ancestro posicionado.
                    Añadimos style objectFit/objectPosition además de las clases para garantizar que siempre cubra el contenedor. */}
                <Image
                    src={maxusBg}
                    alt="Fondo Maxus"
                    fill                // ocupa todo el contenedor
                    priority            // se carga primero (LCP)
                    placeholder="blur"  // blur mientras carga
                    quality={100}        // baja un poco la calidad para más velocidad
                    sizes="65vw"       // Next genera tamaños responsivos
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="opacity-90"
                />
            </div>
            {/* ========== OVERLAY SUTIL ========== */}
            {/* Gradiente muy sutil solo para legibilidad sin opacar */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-blue-900/20" />

            {/* ========== ELEMENTOS DECORATIVOS SUTILES ========== */}
            {/* Blobs muy suaves que no compiten con la imagen */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />

            {/* ========== LOGO COMPACTO PREMIUM ========== */}
            {/* Logo más pequeño en móvil para no competir con el contenido */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 lg:left-12 z-20">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex flex-col gap-3 sm:gap-4"
                >
                    {/* Logo desktop: oculto en móvil, block en md+ */}
                    <Image
                        className="relative rounded-xl hidden md:block"
                        src={"/logoBlack.png"}
                        alt={"Macar Repuestos"}
                        height={450}
                        width={380}
                        priority
                    />

                    {/*LOGO EN CELULARES*/}
                    <Image
                        className="relative rounded-xl  md:hidden "
                        src={"/logoBlack.png"}
                        alt={"Macar Repuestos"}
                        height={350}
                        width={280}
                        priority
                    />

                    {/* TEXTO ANIMADO BAJO EL LOGO EN COMPUTADORES */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="-mt-25 hidden md:block"
                    >
                        <div className="ml-20 w-full flex justify-center ">
                            {/* Contenedor para los títulos animados: forzamos una sola línea con espacio suficiente */}
                            <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 flex items-center justify-center mt-1 py-4 px-4 min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
                                {titles.map((t, index) => (
                                    <motion.span
                                        key={index}
                                        className={`absolute text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black whitespace-nowrap ${t.color}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        transition={{ type: "spring", stiffness: 50 }}
                                        animate={
                                            titleNumber === index
                                                ? { y: 0, opacity: 1 }
                                                : { y: titleNumber > index ? -30 : 30, opacity: 0 }
                                        }
                                    >
                                        {t.text}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                     </motion.div>

                </motion.div>
             </div>




            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block md:hidden mt-40"
            >
                <div className="w-full flex justify-center ">
                    {/* Contenedor para los títulos animados: forzamos una sola línea con espacio suficiente */}
                    <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 flex items-center justify-center mt-1 py-4 px-4 min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
                        {titles.map((t, index) => (
                            <motion.span
                                key={index}
                                className={`absolute text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black whitespace-nowrap ${t.color}`}
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ type: "spring", stiffness: 50 }}
                                animate={
                                    titleNumber === index
                                        ? { y: 0, opacity: 1 }
                                        : { y: titleNumber > index ? -30 : 30, opacity: 0 }
                                }
                            >
                                {t.text}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>






            {/* ========== CONTENEDOR DEL CONTENIDO PRINCIPAL ========== */}
            <div className="container mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center lg:justify-end min-h-screen py-20 sm:py-24 lg:py-32">
                    {/* Content - Responsive - Distribuido verticalmente a lo largo de la pantalla */}
                    <div className="flex flex-col items-center lg:items-end text-center lg:text-right gap-12 sm:gap-16 lg:gap-20 max-w-3xl w-full px-2 sm:px-4">

                        {/* ========== BADGE PREMIUM GLASSMORPHISM ========== */}


                        {/* ========== TÍTULO PREMIUM CON FONDO SUTIL ========== */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex flex-col gap-6 sm:gap-8 lg:gap-10"
                        >
                            {/* Lista premium estilo startup con tarjetas separadas */}




                            <div className="hidden md:flex flex-col gap-3">
                                <div className="group rounded-3xl px-4 py-2 backdrop-blur-md bg-white/40 hover:bg-white/50 shadow-md hover:shadow-xl border border-white/60 transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex-shrink-0 shadow-lg shadow-green-500/50"></span>
                                        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 tracking-tight">Despacho a todo Chile</span>
                                    </div>
                                </div>
                                <br/>

                                <div className="md:block group rounded-3xl px-4 py-2 backdrop-blur-md bg-white/40 hover:bg-white/50 shadow-md hover:shadow-xl border border-white/60 transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex-shrink-0 shadow-lg shadow-green-500/50"></span>
                                        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 tracking-tight">Mantenciones Completas</span>
                                    </div>
                                </div>
                                <br/>

                                <div className="md:block  group rounded-3xl px-4 py-2 backdrop-blur-md bg-white/40 hover:bg-white/50 shadow-md hover:shadow-xl border border-white/60 transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex-shrink-0 shadow-lg shadow-green-500/50"></span>
                                        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 tracking-tight">Solo repuestos Originales</span>
                                    </div>
                                </div>
                                <br/>
                                <div className="md:block  group rounded-3xl px-4 py-2 backdrop-blur-md bg-white/40 hover:bg-white/50 shadow-md hover:shadow-xl border border-white/60 transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex-shrink-0 shadow-lg shadow-green-500/50"></span>
                                        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 tracking-tight">Tiempo de entrega récord</span>
                                    </div>
                                </div>
                                <br/>

                                <div className="group rounded-3xl px-4 py-2 backdrop-blur-md bg-white/40 hover:bg-white/50 shadow-md hover:shadow-xl border border-white/60 transition-all duration-300 hover:scale-105">
                                    <div className="flex items-center gap-3">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex-shrink-0 shadow-lg shadow-green-500/50"></span>
                                        <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-gray-900 tracking-tight">Garantía de calidad</span>
                                    </div>
                                </div>
                            </div>

                            {/* ========== SUBTÍTULO ANIMADO PREMIUM ========== */}

                        </motion.div>

                        {/* ========== BOTONES DE ACCIÓN (CTA) ========== */}
                        {/* Animación: entra desde abajo */}

                        <div className="hidden md:block">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto mt-4 "
                            >
                                {/* BOTÓN PRIMARIO AZUL - Más pequeño en móvil */}
<Link href={"/catalogo"}>
    <Button
        size="lg"
        className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base lg:text-lg px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 w-full sm:w-auto"
    >
        Ver Catálogo
        <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />
    </Button>
</Link>

                                {/* BOTÓN SECUNDARIO (OUTLINE) - Más pequeño en móvil */}
<Link href={"/formularioContacto"}>
    <Button
        size="lg"
        variant="outline"
        className="gap-2 border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 text-blue-900 transition-all duration-300 text-sm sm:text-base lg:text-lg px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 w-full sm:w-auto"
    >
        <EnvelopeIcon className="w-5 h-5" />
        Contáctanos
    </Button>
</Link>
                            </motion.div>
                        </div>






                        {/*BOTONES  EN MOVILES RESPONSIVOS HECHOS POR NICOLAS*/}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto md:hidden -mt-100 ml-6"
                        >

                        <div className={"justify-content-start"}>
                            <h1 className={outfit.className}>Repuestos para Maxus Originales</h1>
                        </div>


<div className="w-full gap-3">

    <Link href={"/catalogo"}>
        <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base lg:text-lg px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 w-50">
            Ver Catálogo <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
    </Link>



</div>


                            <Image
                                className="relative rounded-xl block  md:hidden ml-30 -mt-9 "
                                src={"/logoMaxusBlack.png"}
                                alt={"Macar Repuestos"}
                                height={150}
                                width={180}
                                priority
                            />
                        </motion.div>





                    </div>
                </div>
            </div>
        </div>
    )
}