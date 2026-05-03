"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0 },
};

const quickStats = [
  { value: "700+", label: "repuestos disponibles" },
  { value: "1000+", label: "clientes atendidos" },
  { value: "100%", label: "foco en calidad" },
];

export default function Portada() {
  return (
    <div className={outfit.className}>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#05070b] text-white">
        <div className="absolute inset-0">
          <Image
            src="/t90xxxx.jpg"
            alt="Camionetas Maxus"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[76%_center] md:object-[center_center] scale-[1.02]"
          />
          <div className="absolute inset-0 bg-black/58" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_34%),radial-gradient(circle_at_82%_20%,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(0,0,0,0.22),transparent_44%)]" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-soft-light [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:64px_64px]" />
        </div>

        <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[28rem] w-[28rem] rounded-full bg-blue-300/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-14%] right-[-8%] h-[30rem] w-[30rem] rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-start px-4 pt-4 pb-10 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8 lg:pb-8">
          <div className="grid w-full items-end gap-10 lg:grid-cols-12">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
              className="px-2 py-2 sm:px-4 lg:col-span-8 lg:px-6 lg:py-4 xl:col-span-7"
            >
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#0f213a]/40 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-md"
              >
                <Sparkles className="h-3.5 w-3.5 text-blue-200" />
                Especialistas Maxus en Chile
              </motion.div>

              <motion.div variants={fadeUp} className="mt-6">
                <Image
                  src="/logoBlack2.png"
                  alt="Macar Repuestos"
                  width={620}
                  height={300}
                  priority
                  className="h-auto w-[235px] drop-shadow-[0_24px_60px_rgba(0,0,0,0.6)] sm:w-[290px] lg:w-[370px]"
                />
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 max-w-3xl text-[2.35rem] font-black leading-[0.96] tracking-[-0.035em] text-white [text-shadow:0_8px_28px_rgba(0,0,0,0.50)] sm:text-[3rem] lg:text-[4.1rem]"
              >
                Repuestos
                <span className={`block ${cormorant.className} text-[1.08em] font-semibold italic tracking-[-0.03em] text-blue-100`}>
                  originales Maxus
                </span>
                <span className="mt-2 block text-[0.42em] font-semibold uppercase tracking-[0.16em] text-white/88 [text-shadow:0_6px_20px_rgba(0,0,0,0.45)]">
                  respaldo técnico, despacho rápido y compra segura
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-5 max-w-xl text-sm font-medium leading-7 text-white/92 [text-shadow:0_4px_14px_rgba(0,0,0,0.40)] sm:text-[15px] sm:leading-7"
              >
                Selección precisa, atención profesional y stock enfocado en Maxus para que compres con certeza.
                Menos fricción, mejor compatibilidad y una experiencia más seria de principio a fin.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <Link href="/catalogo" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="group w-full rounded-2xl border border-blue-300/25 bg-blue-600 px-7 py-6 text-sm font-extrabold uppercase tracking-[0.16em] text-white shadow-[0_20px_60px_rgba(0,0,0,0.38)] transition-all duration-300 hover:bg-blue-500 sm:w-auto"
                  >
                    Ver catálogo
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Button>
                </Link>

                <a href="https://wa.me/56995043704" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-2xl border border-blue-100/20 bg-[#0d1c31]/42 px-7 py-6 text-sm font-bold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-all duration-300 hover:bg-[#132744]/60 sm:w-auto"
                  >
                    Cotizar por WhatsApp
                  </Button>
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
                {quickStats.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.4rem] border border-blue-100/10 bg-[#0b1730]/34 px-5 py-4 backdrop-blur-md shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
                  >
                    <div className="text-xl font-black tracking-[-0.05em] text-white sm:text-2xl">{item.value}</div>
                    <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/56">
                      {item.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
