"use client"
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import maxusBg from "../../../../public/maxusportada02.webp";
import Link from "next/link";
import { Outfit } from "next/font/google";
import MotionCards, { MotionCardContent } from "@/components/ui/motioncards";
import { Layers, Component as LucideComponent, LayoutPanelTop, Package, Scroll } from "lucide-react";
import { AnimatedTextGenerate } from "@/components/ui/animated-textgenerate";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["900"]
});

export default function Portada() {

    const [titleNumber, setTitleNumber] = useState(0);

    // Convertimos los títulos a objetos para poder asignar color permanente a cada uno
    const titles = useMemo(
        () => [
            {
                text: "Especialistas Maxus",
                gradient: "bg-gradient-to-r from-blue-400 via-blue-700 to-cyan-400",
                shadow: "shadow-blue-900/90",
                glow: "drop-shadow-[0_0_16px_rgba(59,130,246,0.45)]",
            },
            {
                text: "Repuestos Originales",
                gradient: "bg-gradient-to-r from-blue-200 via-cyan-400 to-blue-600",
                shadow: "shadow-cyan-500/80",
                glow: "drop-shadow-[0_0_16px_rgba(59,130,246,0.45)]",
            },
            {
                text: "Máxima Calidad",
                gradient: "bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600",
                shadow: "shadow-blue-500/90",
                glow: "drop-shadow-[0_0_16px_rgba(59,130,246,0.35)]",
            },
            {
                text: "Garantía de calidad",
                gradient: "bg-gradient-to-r from-blue-200 via-blue-600 to-cyan-400",
                shadow: "shadow-cyan-400/80",
                glow: "drop-shadow-[0_0_16px_rgba(34,211,238,0.45)]",
            },
            {
                text: "Repuestos Certificados",
                gradient: "bg-gradient-to-r from-blue-500 via-blue-800 to-cyan-400",
                shadow: "shadow-blue-900/90",
                glow: "drop-shadow-[0_0_16px_rgba(59,130,246,0.45)]",
            },
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


    return (
        <div className="relative w-full min-h-screen bg-gradient-to-br from-blue-50/30 via-transparent to-blue-100/30 overflow-hidden">

            {/* ========== IMAGEN DE FONDO VISIBLE ========== */}
            {/* Contenedor posicionado para que Next/Image con `fill` funcione correctamente. */}
            {/* Usamos z-0 aquí y z-10 en el contenido para evitar dependencias de clases Tailwind negativas como `-z-10`. */}
            <div className="absolute inset-0 z-0 w-full h-screen md:h-[85vh]" aria-hidden="true">
                {/* Imagen para celulares */}
                <Image
                    src="/maxuscel.png"
                    alt="Fondo Maxus Mobile"
                    fill
                    priority
                    className="object-cover object-center w-full h-full opacity-90 block md:hidden"
                />
                {/* Imagen para desktop/tablet */}
                <Image
                    src={maxusBg}
                    alt="Fondo Maxus"
                    fill
                    priority
                    className="object-cover object-center w-full h-full opacity-90 hidden md:block"
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
            <div className="absolute top-0 left-6 right-6 sm:top-2 lg:top-4 z-20">
                <div className="flex w-full justify-center md:justify-start md:ml-40 lg:ml-32">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative flex flex-col gap-3 sm:gap-4"
                    >
                        {/* Logo desktop: oculto en móvil, block en md+ */}
                            <Image
                                className="relative rounded-xl hidden md:block md:ml-50 mx-24 lg:ml-32"
                            src={"/logoBlack2.png"}
                            alt={"Macar Repuestos"}
                            height={500}
                            width={500}
                            priority
                        />

                        {/*LOGO EN CELULARES*/}
                        <Image
                            className="relative rounded-xl md:hidden"
                            src={"/logoBlack2.png"}
                            alt={"Macar Repuestos"}
                            height={350}
                            width={280}
                            priority
                        />

                        {/* TEXTO ANIMADO BAJO EL LOGO EN COMPUTADORES */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="hidden md:flex w-full justify-center items-center mt-12 mb-8"
                        >
                            <div className="w-full flex justify-center items-center">
                                <div className="relative h-24 sm:h-28 md:h-32 lg:h-36 flex items-center justify-center py-8 px-8 min-w-[260px] sm:min-w-[340px] md:min-w-[420px] max-w-2xl mx-auto">
                                    <div className={`absolute inset-0 rounded-3xl shadow-xl ${titles[titleNumber].gradient} opacity-95 blur-[1px]`} style={{ zIndex: 1 }} />
                                    <div className="relative z-10 flex items-center justify-center w-full h-full">
                                        <AnimatedTextGenerate
                                            className={`text-center mb-8 p-4`}
                                            textClassName={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center font-black whitespace-nowrap drop-shadow-xl ${titles[titleNumber].shadow} ${titles[titleNumber].glow} text-white`}
                                            text={titles[titleNumber].text}
                                            blurEffect
                                            speed={1}
                                        />
                                    </div>
                                    {/* Espacio extra para separar el título del listado */}
                                    <div className="w-full" style={{ height: '48px' }} />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>




            <motion.div
                initial={{ opacity: 10, y: 20 }}
                animate={{ opacity: 10, y: 10 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="block md:hidden text-center mt-40"
            >
                <div className="w-full rounded-2xl flex text-center justify-center ">
                    <div className="relative h-16 sm:h-20 md:h-24 lg:h-28 flex text-center items-center justify-center mt-1 py-4 px-4 min-w-[300px] sm:min-w-[400px] md:min-w-[500px]">
                        <div className={`absolute inset-0 rounded-2xl shadow-lg ${titles[titleNumber].gradient} opacity-80 blur-[1px]`} style={{ zIndex: 1 }} />
                        <div className="relative z-10 flex items-center justify-center w-full h-full">
                            <AnimatedTextGenerate
                                className={`text-center mb-8 p-4`}
                                textClassName={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-black whitespace-nowrap drop-shadow-xl ${titles[titleNumber].shadow} ${titles[titleNumber].glow} text-white`}
                                text={titles[titleNumber].text}
                                blurEffect
                                speed={1}
                            />
                        </div>
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


                            {/* Lista profesional animada de beneficios (MotionCards) */}
                            <div className="hidden md:flex flex-col items-end justify-end self-end w-full pt-4 text-right" style={{ zIndex: 10 }}>
                                <MotionCards interval={120} className="w-full items-end text-right max-w-md">
                                    <MotionCardContent className="flex items-center gap-3 w-full min-h-[72px] px-4">
                                        <Layers className="w-6 h-6 flex-shrink-0" />
                                        <span className="font-semibold text-base w-full text-left whitespace-normal">
                                        Cobertura nacional: despacho seguro y rápido a todo Chile
                                        </span>
                                    </MotionCardContent>
                                    <MotionCardContent className="flex items-center gap-3 w-full min-h-[72px] px-4">
                                        <LucideComponent className="w-6 h-6 flex-shrink-0" />
                                        <span className="font-semibold text-base w-full text-left whitespace-normal">
                                        Mantenciones integrales para vehículos Maxus
                                        </span>
                                    </MotionCardContent>
                                    <MotionCardContent className="flex items-center gap-3 w-full min-h-[72px] px-4">
                                        <LayoutPanelTop className="w-6 h-6 flex-shrink-0" />
                                        <span className="font-semibold text-base w-full text-left whitespace-normal">
                                        Repuestos originales: calidad y compatibilidad garantizadas
                                        </span>
                                    </MotionCardContent>
                                    <MotionCardContent className="flex items-center gap-3 w-full min-h-[72px] px-4">
                                        <Scroll className="w-6 h-6 flex-shrink-0" />
                                        <span className="font-semibold text-base w-full text-left whitespace-normal">
                                        Entrega eficiente y soporte postventa profesional
                                        </span>
                                    </MotionCardContent>
                                    <MotionCardContent className="flex items-center gap-3 w-full min-h-[72px] px-4">
                                        <Package className="w-6 h-6 flex-shrink-0" />
                                        <span className="font-semibold text-base w-full text-left whitespace-normal">
                                        Stock permanente y atención personalizada
                                        </span>
                                    </MotionCardContent>
                                </MotionCards>
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
                                        className="gap-2 bg-gradient-to-r rounded-2xl from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base lg:text-lg px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 w-full sm:w-auto"
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

                            <div className={"justify-content-start text-white text-center mt-12 bg-white/50 rounded-xl shadow-lg backdrop-blur p-6"}>
                                <h1 className={outfit.className}>Repuestos originales para tus vehículos Maxus</h1>
                            </div>


                            <div className="w-full gap-3 mt-12">

                                <Link href={"/catalogo"}>
                                    <Button size="lg" className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base lg:text-lg px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 w-50">
                                        Ver Catálogo <MoveRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                    </Button>
                                </Link>
                            </div>

                            <Image
                                className="mx-auto mt-10 relative rounded-xl block  md:hidden"
                                src={"/logoMaxusBlack.png"}
                                alt={"Macar Repuestos"}
                                height={200}
                                width={200}
                                priority
                            />
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    )
}