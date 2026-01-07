"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Outfit } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Layers, LayoutPanelTop, Package, Scroll } from "lucide-react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["900"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

export default function Portada() {
  return (
<div>
    <div className='block md:hidden'>
        <div
            className={`relative h-[100svh] w-full overflow-hidden ${outfit.className} bg-black`}
        >
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/maxuscel.png"
                    alt="Macar Repuestos - Fondo"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center opacity-70"
                />
                {/* Premium overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.28),transparent_45%),radial-gradient(circle_at_85%_70%,rgba(99,102,241,0.30),transparent_50%)]" />
            </div>

            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-28 -right-28 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-[560px] w-[560px] rounded-full bg-white/10 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
                <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Left: Brand + hero */}
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.08 } },
                        }}
                        className="lg:col-span-7"
                    >
                        {/* Top bar */}
                        <motion.div variants={fadeUp} className="flex items-center gap-3">
                            <div className="relative">
                                <Image
                                    src="/logoBlack2.png"
                                    alt="Macar Repuestos"
                                    width={620}
                                    height={440}
                                    priority
                                    className="h-auto w-[240px] sm:w-[320px] lg:w-[420px] drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
                                />
                            </div>
                            <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-md">
                                <span className="inline-block h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                                Repuestos Maxus • Envíos a todo Chile
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={fadeUp}
                            className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl"
                        >
                            Repuestos Maxus
                            <span className="bg-gradient-to-r from-cyan-200 via-white to-indigo-200 bg-clip-text text-transparent">
                {" "}originales
              </span>
                            {" "}con despacho rápido
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeUp}
                            className="mt-4 max-w-2xl text-pretty text-base font-semibold leading-relaxed text-white/85 sm:text-lg"
                        >
                            Compra seguro con asesoría experta. Stock permanente, compatibilidad garantizada y atención
                            personalizada para tu vehículo.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
                        >
                            <Link href="/catalogo" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-7 py-6 text-base font-extrabold text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-all duration-300 hover:from-cyan-400 hover:to-indigo-500 hover:shadow-[0_22px_60px_rgba(0,0,0,0.55)] sm:w-auto"
                                >
                                    Ver catálogo
                                    <span className="text-white/90">→</span>
                                </Button>
                            </Link>

                            <a href="https://wa.me/56995043704" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full gap-2 rounded-2xl border border-white/25 bg-white/5 px-7 py-6 text-base font-extrabold text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/10 sm:w-auto"
                                >
                                    Cotizar por WhatsApp
                                </Button>
                            </a>
                        </motion.div>

                        {/* Trust line */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-white/75"
                        >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Originales y compatibles
              </span>
                            <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-200" />
                Soporte técnico
              </span>
                            <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
                Despacho nacional
              </span>
                        </motion.div>
                    </motion.div>

                    {/* Right: Feature cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
                        className="hidden sm:block lg:col-span-5"
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FeatureCard
                                icon={<Layers className="h-6 w-6 text-cyan-200" />}
                                title="Cobertura nacional"
                                desc="Despacho seguro y seguimiento."
                            />
                            <FeatureCard
                                icon={<LayoutPanelTop className="h-6 w-6 text-indigo-200" />}
                                title="Compatibilidad"
                                desc="Te ayudamos a elegir la pieza correcta."
                            />
                            <FeatureCard
                                icon={<Scroll className="h-6 w-6 text-cyan-200" />}
                                title="Soporte profesional"
                                desc="Asesoría técnica y postventa."
                            />
                            <FeatureCard
                                icon={<Package className="h-6 w-6 text-indigo-200" />}
                                title="Stock permanente"
                                desc="Rotación constante y atención rápida."
                            />
                        </div>

                        {/* Mock preview card */}

                    </motion.div>
                </div>
            </div>
        </div>
    </div>







    <div className='hidden md:block'>
        <div
            className={`relative h-[100svh] w-full overflow-hidden ${outfit.className} bg-black`}
        >
            {/* Background image */}
            <div className="absolute inset-0">
                <Image
                    src="/maxuscel.png"
                    alt="Macar Repuestos - Fondo"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center opacity-70"
                />
                {/* Premium overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(34,211,238,0.28),transparent_45%),radial-gradient(circle_at_85%_70%,rgba(99,102,241,0.30),transparent_50%)]" />
            </div>

            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -top-28 -right-28 h-[520px] w-[520px] rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-[560px] w-[560px] rounded-full bg-white/10 blur-3xl" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
                <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                    {/* Left: Brand + hero */}
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.08 } },
                        }}
                        className="lg:col-span-7"
                    >
                        {/* Top bar */}
                        <motion.div variants={fadeUp} className="flex items-center gap-3">
                            <div className="relative">
                                <Image
                                    src="/logoBlack2.png"
                                    alt="Macar Repuestos"
                                    width={520}
                                    height={240}
                                    priority
                                    className="h-auto w-[240px] sm:w-[320px] lg:w-[420px] drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]"
                                />
                            </div>
                            <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/90 backdrop-blur-md">
                                <span className="inline-block h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.9)]" />
                                Repuestos Maxus • Envíos a todo Chile
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            variants={fadeUp}
                            className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow-[0_20px_40px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-6xl"
                        >
                            Repuestos Maxus
                            <span className="bg-gradient-to-r from-cyan-200 via-white to-indigo-200 bg-clip-text text-transparent">
                {" "}originales
              </span>
                            {" "}con despacho rápido
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            variants={fadeUp}
                            className="mt-4 max-w-2xl text-pretty text-base font-semibold leading-relaxed text-white/85 sm:text-lg"
                        >
                            Compra seguro con asesoría experta. Stock permanente, compatibilidad garantizada y atención
                            personalizada para tu vehículo.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
                        >
                            <Link href="/catalogo" className="w-full sm:w-auto">
                                <Button
                                    size="lg"
                                    className="w-full gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-7 py-6 text-base font-extrabold text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-all duration-300 hover:from-cyan-400 hover:to-indigo-500 hover:shadow-[0_22px_60px_rgba(0,0,0,0.55)] sm:w-auto"
                                >
                                    Ver catálogo
                                    <span className="text-white/90">→</span>
                                </Button>
                            </Link>

                            <a href="https://wa.me/56995043704" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full gap-2 rounded-2xl border border-white/25 bg-white/5 px-7 py-6 text-base font-extrabold text-white/90 backdrop-blur-md transition-all duration-300 hover:bg-white/10 sm:w-auto"
                                >
                                    Cotizar por WhatsApp
                                </Button>
                            </a>
                        </motion.div>

                        {/* Trust line */}
                        <motion.div
                            variants={fadeUp}
                            className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-white/75"
                        >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Originales y compatibles
              </span>
                            <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-200" />
                Soporte técnico
              </span>
                            <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
                Despacho nacional
              </span>
                        </motion.div>
                    </motion.div>

                    {/* Right: Feature cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, ease: "easeOut", delay: 0.15 }}
                        className="hidden sm:block lg:col-span-5"
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <FeatureCard
                                icon={<Layers className="h-6 w-6 text-cyan-200" />}
                                title="Cobertura nacional"
                                desc="Despacho seguro y seguimiento."
                            />
                            <FeatureCard
                                icon={<LayoutPanelTop className="h-6 w-6 text-indigo-200" />}
                                title="Compatibilidad"
                                desc="Te ayudamos a elegir la pieza correcta."
                            />
                            <FeatureCard
                                icon={<Scroll className="h-6 w-6 text-cyan-200" />}
                                title="Soporte profesional"
                                desc="Asesoría técnica y postventa."
                            />
                            <FeatureCard
                                icon={<Package className="h-6 w-6 text-indigo-200" />}
                                title="Stock permanente"
                                desc="Rotación constante y atención rápida."
                            />
                        </div>

                        {/* Mock preview card */}

                    </motion.div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group rounded-3xl border border-white/12 bg-white/10 p-5 backdrop-blur-md shadow-[0_18px_60px_rgba(0,0,0,0.45)] transition-all duration-300 hover:bg-white/12 hover:shadow-[0_22px_70px_rgba(0,0,0,0.55)]">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/12 bg-white/10">
          {icon}
        </div>
        <div>
          <div className="text-base font-extrabold text-white/90">{title}</div>
          <div className="mt-1 text-sm font-semibold text-white/70">{desc}</div>
        </div>
      </div>
    </div>
  );
}