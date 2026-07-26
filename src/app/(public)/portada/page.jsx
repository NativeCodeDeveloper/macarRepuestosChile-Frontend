"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Outfit } from "next/font/google";
import {
  BadgeCheck,
  MessageCircle,
  Search,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const HERO_IMAGE = {
  src: "/waal.png",
  alt: "Camioneta Maxus T90 gris frente a una ciudad iluminada de noche",
};

const benefits = [
  { icon: BadgeCheck, line1: "Originales y", line2: "alternativos" },
  { icon: Truck, line1: "Despacho a", line2: "todo Chile" },
  { icon: ShieldCheck, line1: "Compra", line2: "segura" },
];

const contentMotion = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.07,
    },
  },
};

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Portada() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={`${outfit.className} dark relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-[#02060d] text-white`}
      style={{
        "--primary": "oklch(0.58 0.23 260)",
        "--primary-foreground": "oklch(0.99 0 0)",
      }}
      aria-label="Portada Macar Repuestos"
    >
      <div className="absolute inset-0 bg-[#02060d]">
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_center] sm:object-center"
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,13,0.99)_0%,rgba(2,6,13,0.94)_27%,rgba(2,6,13,0.54)_50%,rgba(2,6,13,0.08)_78%),linear-gradient(0deg,rgba(2,6,13,0.96)_0%,transparent_42%),linear-gradient(180deg,rgba(2,6,13,0.46)_0%,transparent_38%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.28)_1px,transparent_1px)] [background-size:72px_72px]"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-[1536px] flex-col px-5 pb-5 pt-7 sm:px-8 lg:px-[5%] lg:pb-6 lg:pt-14">
        <motion.div
          variants={contentMotion}
          initial={shouldReduceMotion ? false : "hidden"}
          animate="visible"
          className="mt-12 flex max-w-[35rem] flex-col lg:flex-1 lg:justify-center lg:pb-16 xl:max-w-[38rem]"
        >
          <motion.div
            variants={reveal}
            className="flex items-center gap-4 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-blue-200/90 sm:text-xs"
          >
            <span className="h-0.5 w-12 bg-primary" aria-hidden="true" />
            Especialistas en repuestos Maxus
          </motion.div>

          <motion.h1
            variants={reveal}
            className="mt-6 text-[3.4rem] font-black leading-[0.92] tracking-[-0.055em] text-white sm:text-[4.25rem] lg:text-[4.7rem] xl:text-[5.25rem]"
          >
            <span className="block">Todo para</span>
            <span className="block">tu Maxus.</span>
            <span className="mt-2 block text-[0.68em] font-semibold leading-none tracking-[-0.035em] text-primary">
              En un solo lugar.
            </span>
          </motion.h1>

          <motion.p
            variants={reveal}
            className="mt-7 max-w-[29rem] text-base font-normal leading-7 text-white/70 sm:text-lg sm:leading-8"
          >
            Repuestos originales y alternativos para camionetas y furgones
            Maxus. Asesoría especializada y despacho a todo Chile.
          </motion.p>

          <motion.div
            variants={reveal}
            className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-7 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="h-14 rounded-lg px-6 text-xs font-bold uppercase tracking-[0.1em]"
            >
              <Link href="/catalogo">
                <Search data-icon="inline-start" />
                Buscar mi repuesto
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 rounded-lg px-6 text-xs font-bold uppercase tracking-[0.08em] backdrop-blur-md"
            >
              <a
                href="https://wa.me/56995043704"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle data-icon="inline-start" />
                Hablar con un especialista
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={reveal}
            className="mt-9 grid grid-cols-3 divide-x divide-white/25"
          >
            {benefits.map(({ icon: Icon, line1, line2 }) => (
              <div
                key={line2}
                className="flex min-w-0 items-center gap-3 px-3 first:pl-0 last:pr-0"
              >
                <Icon className="size-8 shrink-0 text-primary" aria-hidden="true" />
                <p className="text-xs font-medium leading-5 text-white/88 sm:text-sm">
                  {line1}
                  <span className="block">{line2}</span>
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
