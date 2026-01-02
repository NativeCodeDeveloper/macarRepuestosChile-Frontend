"use client"

import * as React from "react"
import Link from "next/link"
import { ShoppingCart, Phone, Menu, X } from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";

export function ShadcnNavBar() {

    const [carrito, _setCarrito] = useCarritoGlobal();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [carritoGlobalCanitidad, setCarritoGlobalCanitidad] = React.useState(0)

    // Sincronizar la cantidad del carrito solo en el cliente para evitar errores de hidratación
    React.useEffect(() => {
        setCarritoGlobalCanitidad(carrito.length || 0);
    }, [carrito]);

    return (
        <div className="w-full bg-gradient-to-b from-gray-950 to-gray-900 border-b border-gray-800 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">

                {/* Header para móvil: Hamburguesa y Carrito */}
                <div className="flex lg:hidden items-center justify-between">

                    {/* Botón Hamburguesa (solo móvil) */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
                        aria-label="Abrir menú"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                    {/* Botón Carrito */}
                    <Link
                        href="/carrito"
                        className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 group"
                    >
                        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-gray-950 animate-pulse">
                            {carritoGlobalCanitidad}
                        </span>
                    </Link>
                </div>

                {/* Navigation Menu Desktop (oculto en móvil) */}
                <div className="hidden lg:flex items-center justify-between">
                    <NavigationMenu className="relative z-50 flex-1">
                        <NavigationMenuList className="flex-wrap gap-2">


                {/* ========== MENÚ INICIO ========== */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-200 hover:text-white hover:bg-gray-800/90 text-base font-semibold px-4 py-2">
                        Inicio
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[450px] lg:w-[550px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="no-underline flex h-full w-full select-none flex-col justify-end rounded-lg bg-black p-6 no-outline hover:shadow-xl transition-all duration-300"
                                        href="/">

                                        <img src="/logoGrande.png" 
                                        alt="Macar Repuestos"
                                        className="w-full mb-2 object-contain" />        

                                        <div className="mb-2 mt-4 text-xl font-bold text-white">
                                            Macar Repuestos
                                        </div>
                                        <p className="text-sm leading-tight text-blue-100">
                                            Repuestos originales Maxus. Calidad garantizada desde 1998.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/nosotros" title="Sobre Nosotros">
                                Nuestra historia como importadores premium de repuestos.
                            </ListItem>
                            <ListItem href="/mision" title="Misión y Visión">
                                Nuestro compromiso con la excelencia y calidad.
                            </ListItem>
                            <ListItem href="/formularioContacto" title="Contacto">
                                Contáctanos por nuestros canales de atención.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {/* ========== MENÚ DE SERVICIOS ========== */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-200 hover:text-white hover:bg-gray-800/50 text-base font-semibold px-4 py-2">
                        Servicios
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[450px] lg:w-[550px]">
                            <ListItem href="/catalogo" title="Búsqueda de Repuestos">
                                Encuentra el repuesto exacto que necesitas para tu vehículo Maxus.
                            </ListItem>
                            <ListItem href="/formularioContacto" title="Asesoría Técnica">
                                Nuestros expertos te ayudan a elegir el repuesto correcto.
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* ========== ENLACE CATÁLOGO COMPLETO ========== */}
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/catalogo" className="no-underline text-gray-200 hover:text-white hover:bg-gray-800/50 text-base font-semibold px-4 py-2">
                            Catálogo Completo
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>

                {/* ========== ENLACE CONTACTO ========== */}
                <NavigationMenuItem className="hidden md:block">
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/formularioContacto" className="no-underline text-gray-200 hover:text-white hover:bg-gray-800/50 text-base font-semibold px-4 py-2">
                            Contacto
                        </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>

                    {/* Número de teléfono y Carrito (Desktop) */}
                    <div className="flex items-center gap-4 ml-6">
                        {/* Número de teléfono */}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 backdrop-blur-sm">
                            <img
                                src="https://www.svgrepo.com/show/176768/whatsapp-social-media.svg"
                                className="w-6 h-6"
                                alt="WhatsApp"
                            />
                            <a
                                href="tel:+56943805047"
                                className="text-base font-semibold text-white hover:text-blue-400 transition-colors duration-200"
                            >
                                +56 9 9504 3704
                            </a>
                        </div>

                        {/* Botón Carrito */}
                        <Link
                            href="/carrito"
                            className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 group"
                        >
                            <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium">Carrito</span>
                            <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-gray-950 animate-pulse">
                                {carritoGlobalCanitidad}
                            </span>
                        </Link>
                    </div>
                </div>

                {/* Menú Móvil Desplegable */}
                <div
                    className={`lg:hidden transition-all duration-300 ease-in-out ${
                        mobileMenuOpen
                            ? 'max-h-[calc(100vh-72px)] opacity-100 mt-4 overflow-y-auto'
                            : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                    style={{ WebkitOverflowScrolling: 'touch' }} // momentum scrolling en iOS
                >
                    <div className="flex flex-col gap-2 py-4 border-t border-gray-700">

                        {/* Número de teléfono móvil */}
                        <a
                            href="tel:+56995043704"
                            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 hover:border-blue-500/60 transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Phone className="w-5 h-5 text-blue-400 animate-pulse" />
                            <span className="text-base font-semibold text-white">+56 9 9504 3704</span>
                        </a>

                        {/* Inicio */}
                        <Link
                            href="/"
                            className="px-4 py-3 rounded-lg text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-800/50 transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Inicio
                        </Link>

                        {/* Catálogo Completo */}
                        <Link
                            href="/catalogo"
                            className="px-4 py-3 rounded-lg text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-800/50 transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Catálogo Completo
                        </Link>

                        {/* Servicios */}
                        <div className="px-4 py-2">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Nuestros Servicios</p>
                            <div className="flex flex-col gap-2">
                                <Link
                                    href="/catalogo"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600 transition-all group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-200 group-hover:text-white">
                                            Búsqueda de Repuestos
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="/formularioContacto"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600 transition-all group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >

                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-200 group-hover:text-white">
                                            Asesoría Técnica
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="/formularioContacto"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600 transition-all group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform"></span>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-200 group-hover:text-white">
                                            Envíos a Todo Chile
                                        </p>
                                    </div>
                                </Link>
                                <Link
                                    href="/formularioContacto"
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600 transition-all group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="text-xl group-hover:scale-110 transition-transform"></span>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-200 group-hover:text-white">
                                            Garantía de Calidad
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Contacto */}
                        <Link
                            href="/formularioContacto"
                            className="px-4 py-3 rounded-lg text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-800/50 transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contacto
                        </Link>

                        {/* Sobre Nosotros */}
                        <Link
                            href="/nosotros"
                            className="px-4 py-3 rounded-lg text-base font-semibold text-gray-200 hover:text-white hover:bg-gray-800/50 transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Sobre Nosotros
                        </Link>

                    </div>
                </div>

            </div>
        </div>
    )
}

function ListItem({
                      title,
                      children,
                      href,
                      ...props
                  }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link href={href} className="no-underline">
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}
