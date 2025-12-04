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
import {useEffect, useState} from 'react';
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";

// ========== ARRAY DE CATEGORÍAS DE REPUESTOS ==========
// Puedes agregar/editar categorías aquí






export function ShadcnNavBar() {

    const [carrito, _setCarrito] = useCarritoGlobal();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
    const [listaCategorias, setListaCategorias] = useState([]);
    const API = process.env.NEXT_PUBLIC_API_URL;

// FUNCION PARA SELECCIONAR LA LISTA COMPLETA DE CATEGORIAS DE PRODUCTOS
    async function seleccionarCategorias() {
        try {
            const res = await fetch(`${API}/categorias/seleccionarCategoria`, {
                method: "GET",
                headers: {Accept: "application/json"},
                cache: "no-store",
            })
            if(!res.ok) {
                console.error('No fue posible cargar la lista de categorias');
                return [];
            }
            const dataCategorias = await res.json();
            const listaCategorias = Array.isArray(dataCategorias) ? dataCategorias : [];
            setListaCategorias(listaCategorias);
            return listaCategorias;

        } catch (error) {
            console.error(error);
            setCategorias([]);
            return [];
        }
    }

    useEffect(() => {
        seleccionarCategorias();
    }, []);


    const carritoGlobalCanitidad = carrito.length || 0;

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
                    <NavigationMenuTrigger className="text-gray-200 hover:text-white hover:bg-gray-800/50 text-base font-semibold px-4 py-2">
                        Inicio
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[450px] lg:w-[550px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="no-underline flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 p-6 outline-none hover:shadow-xl transition-all duration-300"
                                        href="/">
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
                {/* ========== MENÚ DE CATEGORÍAS ========== */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="text-gray-200 hover:text-white hover:bg-gray-800/50 text-base font-semibold px-4 py-2">
                        Categorías
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 sm:w-[500px] md:w-[600px] lg:w-[700px] md:grid-cols-2">
                            {listaCategorias.map((categoria) => (
                                <li key={categoria.id_categoriaProducto}>
                                    <NavigationMenuLink asChild>
                                        <Link
                                            href={"/"}
                                            className="group block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:shadow-md border border-transparent hover:border-blue-200"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl group-hover:scale-110 transition-transform">{categoria.icon}</span>
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold leading-none text-gray-900 group-hover:text-blue-700">
                                                        {categoria.descripcionCategoria}
                                                    </div>

                                                </div>
                                            </div>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            ))}
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
                            <Phone className="w-5 h-5 text-blue-400 animate-pulse" />
                            <a
                                href="tel:+56995043704"
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
                <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? 'max-h-[800px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}>
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
                            📦 Catálogo Completo
                        </Link>

                        {/* Categorías */}
                        <div className="px-4 py-2">
                            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Categorías</p>
                            <div className="flex flex-col gap-2">
                                {listaCategorias.map((categoria) => (
                                    <Link
                                        key={categoria.id_categoriaProducto}
                                        href={"/"}
                                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-800/30 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600 transition-all group"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <span className="text-xl group-hover:scale-110 transition-transform">{categoria.icon}</span>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-200 group-hover:text-white">
                                                {categoria.descripcionCategoria}
                                            </p>

                                        </div>
                                    </Link>
                                ))}
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

