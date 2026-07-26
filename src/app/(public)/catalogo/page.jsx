"use client"

import {useState, useEffect, Suspense} from 'react';
import { toast } from 'react-hot-toast';
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import MediaCardImage from "@/Componentes/MediaCardImage";
import { motion } from "motion/react";
import {useRouter} from "next/navigation";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {ShadcnInput} from "@/Componentes/shadcnInput";
import {ShadcnButton} from "@/Componentes/shadcnButton";

import {Goldman} from "next/font/google"


import {useSearchParams} from "next/navigation"

import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group"

import { ArrowUpRight, Search, ShoppingCart, SlidersHorizontal, Sparkles, Tags } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const formatoPrecioCLP = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
});

function ProductCard({ producto, onView, onAdd, onBuy }) {
    const stockDisponible = Number(producto.cantidadStock) > 0;
    const tieneInformacionStock = producto.cantidadStock !== null
        && producto.cantidadStock !== undefined;
    const esOferta = Number(producto.estadoProducto) === 3;

    return (
        <Card
            className="group h-full min-w-0 gap-0 overflow-hidden rounded-[1.35rem] border-border/80 bg-card py-0 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_55px_rgba(15,23,42,0.16)]"
        >
            <button
                type="button"
                onClick={() => onView(producto.id_producto)}
                className="relative block aspect-square w-full cursor-pointer overflow-hidden bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-label={`Ver detalles de ${producto.tituloProducto}`}
            >
                <div className="size-full transition-transform duration-500 ease-out group-hover:scale-[1.06]">
                    <MediaCardImage
                        imagenProducto={`https://imagedelivery.net/aCBUhLfqUcxA2yhIBn1fNQ/${producto.imagenProducto}/card`}
                        tituloProducto={producto.tituloProducto}
                    />
                </div>

                <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden="true"
                />

                <Badge className="absolute left-2.5 top-2.5 border-primary/20 bg-background/92 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-primary shadow-sm backdrop-blur-md md:left-3.5 md:top-3.5">
                    {esOferta ? "Oferta" : "Repuesto Maxus"}
                </Badge>

                <span className="absolute bottom-3 right-3 hidden translate-y-2 items-center gap-1 rounded-full bg-slate-950/88 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
                    Ver ficha
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </span>
            </button>

            <CardHeader className="gap-2 px-3 pb-0 pt-3 md:px-4 md:pt-4">
                <CardTitle className="line-clamp-2 min-h-10 text-left text-[0.72rem] font-bold leading-5 text-card-foreground md:min-h-12 md:text-sm md:leading-6">
                    {producto.tituloProducto}
                </CardTitle>
            </CardHeader>

            <CardContent className="mt-auto px-3 pb-3 pt-3 md:px-4 md:pb-4">
                <div className="flex items-end justify-between gap-2">
                    <div className="min-w-0">
                        <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:text-[0.65rem]">
                            Precio
                        </p>
                        <p className="mt-0.5 truncate text-base font-black tracking-[-0.03em] text-primary md:text-xl">
                            {formatoPrecioCLP.format(Number(producto.valorProducto) || 0)}
                        </p>
                    </div>

                    <span className="hidden shrink-0 items-center gap-1.5 text-[0.65rem] font-semibold text-muted-foreground xl:flex">
                        <span
                            className={`size-1.5 rounded-full ${
                                tieneInformacionStock && !stockDisponible
                                    ? "bg-amber-500"
                                    : "bg-emerald-500"
                            }`}
                            aria-hidden="true"
                        />
                        {tieneInformacionStock && !stockDisponible
                            ? "Consultar stock"
                            : "Disponible"}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="gap-2 border-t border-border bg-muted/45 px-3 py-3 md:px-4">
                <Button
                    type="button"
                    variant="outline"
                    size="icon-sm"
                    onClick={() => onAdd(producto)}
                    aria-label={`Agregar ${producto.tituloProducto} al carrito`}
                    title="Agregar al carrito"
                >
                    <ShoppingCart data-icon="inline-start" aria-hidden="true" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    className="min-w-0 flex-1"
                    onClick={() => onBuy(producto)}
                >
                    <span className="truncate">Comprar</span>
                    <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                </Button>
            </CardFooter>
        </Card>
    );
}


export default function Catalogo({ searchParams = {} }) {
  return (
    <Suspense fallback={<div className="p-8 text-gray-500">Cargando catálogo…</div>}>
      <CatalogoInner />
    </Suspense>
  );
}

const goldman = Goldman({
    subsets: ["latin"],
    weight: ["400"]
});


function CatalogoInner() {
    const searchParams = useSearchParams();
    const API = process.env.NEXT_PUBLIC_API_URL;
    const [_carrito, setCarrito] = useCarritoGlobal();

    // Estados
    const [listaProductos, setListaProductos] = useState([]);
    const [publicaciones, setPublicaciones] = useState([]);
    const [listaCategorias, setListaCategorias] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tituloProducto, setTituloProducto] = useState("");

    // Obtener parámetros de búsqueda
    const id_CategoriaNavBar = searchParams.get("id_categoriaProducto");
    const buscarOfertas = searchParams.get("ofertas");
    const buscarRecientes = searchParams.get("recientes");

    const routerNext = useRouter();


    async function buscarSimilitud(tituloProducto) {
        try {
            if (!tituloProducto || tituloProducto === "" || tituloProducto === " " || tituloProducto === null || tituloProducto === undefined) {
                return toast.error("Debe ingresar al menos una palabra similar a lo que desea encontar");
            }
            const res  = await fetch(`${API}/producto/buscarSimilar`, {
                method: "POST",
                headers: {Accept: "application/json",
                "Content-Type": "application/json"},
                body: JSON.stringify({tituloProducto}),
                mode: "cors"
            })

            if (!res.ok) {
                return toast.error("Debe ingresar al menos una palabra similar a lo que desea encontar");

            }else{
                const dataEncontrada = await res.json();
                if (dataEncontrada.length > 0) {
                    setListaProductos(dataEncontrada);
                    return toast.success("Similitudes encontradas!")
                }else{
                    return toast.error("No se han encontrado similitudes con su busqueda.")
                }
            }
        }catch(err) {
            console.log(err);
            return toast.error('Problema con el servidor Contacte a soporte de NativeCode');
        }
    }

    function agregarAlCarrito(productoSeleccionado) {
        setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
        toast.success("Producto Seleccionado!")

    }

    function comprarAhora(productoSeleccionado) {
        setCarrito(arrayProductosPrevios => [...arrayProductosPrevios, productoSeleccionado])
        routerNext.push("/carrito")
        toast.success("Comprar Ahora!")
    }



    function verProducto(id_producto) {
        routerNext.push(`/producto/${id_producto}`);
    }

    // Cargar productos según parámetros
    useEffect(() => {
        const cargarProductos = async () => {
            setIsLoading(true);
            try {
                if (buscarRecientes) {
                    await listarRecientes();
                } else if (buscarOfertas) {
                    await listarOfertas();
                } else if (id_CategoriaNavBar) {
                    await filtrarPorCategoria(id_CategoriaNavBar);
                } else {
                    await listarRecientes();
                }
            } catch (error) {
                console.error("Error cargando productos:", error);
                toast.error("Error al cargar productos");
            } finally {
                setIsLoading(false);
            }
        };

        cargarProductos();
    }, [buscarRecientes, buscarOfertas, id_CategoriaNavBar]);






    //FUNCION PARA LISTAR TODOS LOS PRODUCTOS RECIENTES QUE NO TENGAN ELIMINACION LOGICA
    async function listarRecientes(){
        try {
            const res = await fetch(`${API}/producto/seleccionarProductoReciente`,{
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                console.error('No fue posible cargar los productos recientes');
                setListaProductos([]);
                return;
            }
            const dataProductos = await res.json();
            const productosArray = Array.isArray(dataProductos)
                ? dataProductos
                : Array.isArray(dataProductos?.productos)
                    ? dataProductos.productos
                    : Array.isArray(dataProductos?.data)
                        ? dataProductos.data
                        : [];
            setListaProductos(productosArray);

        }catch(err){
            console.error('Error en listarRecientes:', err);
            setListaProductos([]);
        }
    }


    //FUNCION PARA FILTRAR PRODUCTOS SEGUN CATEGORIA
    async function filtrarPorCategoria(categoriaProducto){
   try {
       if(!categoriaProducto){
           return;
       }
       const res = await fetch(`${API}/producto/categoriaProducto`, {
           method: "POST",
           headers: {Accept: "application/json",
           "Content-Type": "application/json"},
           mode: "cors",
           body: JSON.stringify({categoriaProducto})
       })
       if (!res.ok){
          toast.error("Problema al filtrar categorías, contacte a Soporte de NativeCode.cl");
          return;
       }
       const dataFiltrada = await res.json();
       setListaProductos(dataFiltrada);

   }catch (error) {
       console.log(error);
   }
    }


    // FUNCION PARA SELECCIONAR LA LISTA COMPLETA DE CATEGORIAS DE PRODUCTOS
    async function seleccionarCategoriasCatalogo() {
        try {
            const res = await fetch(`${API}/categorias/seleccionarCategoria`, {
                method: "GET",
                headers: {Accept: "application/json"},
                cache: "no-store",
            })
            if(!res.ok) {
                console.error('No fue posible cargar la lista de categorias');
                setListaCategorias([]);
                return [];
            }
            const dataCategorias = await res.json();
            const listaCategorias = Array.isArray(dataCategorias) ? dataCategorias : [];
            setListaCategorias(listaCategorias);
            return listaCategorias;
        }catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        seleccionarCategoriasCatalogo();
    }, []);



    // FUNCION PARA LLAMAR A LOS PRODUCTOS EN OFERTA ESTADO NUMERO 3 estadoProducto en base de datos
    async function listarOfertas(){
        try {
            const res = await fetch(`${API}/producto/seleccionarOfertas`,{
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                console.error('No fue posible cargar las ofertas');
                setListaProductos([]);
                return;
            }
            const dataProductos = await res.json();
            const productosArray = Array.isArray(dataProductos)
                ? dataProductos
                : Array.isArray(dataProductos?.productos)
                    ? dataProductos.productos
                    : Array.isArray(dataProductos?.data)
                        ? dataProductos.data
                        : [];
            setListaProductos(productosArray);

        }catch(err){
            console.error('Error en listarOfertas:', err);
            setListaProductos([]);
        }
    }

    //FUNCION PARA LISTAR TODOS LOS PRODUCTOS QUE NO TENGAN ELIMINACION LOGICA
    async function listarProductos(){
        try {
            const res = await fetch(`${API}/producto/seleccionarProducto`,{
                method: 'GET',
                headers: {Accept: 'application/json'},
                mode: 'cors'
            });
            if (!res.ok) {
                console.error('No fue posible cargar todos los productos');
                setListaProductos([]);
                return;
            }
            const dataProductos = await res.json();
            const productosArray = Array.isArray(dataProductos)
                ? dataProductos
                : Array.isArray(dataProductos?.productos)
                    ? dataProductos.productos
                    : Array.isArray(dataProductos?.data)
                        ? dataProductos.data
                        : [];
            setListaProductos(productosArray);

        }catch(err){
            console.error('Error en listarProductos:', err);
            setListaProductos([]);
        }
    }


    async function publicacionesLaterales() {
        try {
            const res = await fetch(`${API}/publicaciones/seleccionarPublicaciones`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })

            if(!res.ok) {
                console.error("No se han podido Listar Publicaciones / Falla en el fetch desde el frontEnd");
                setPublicaciones([])
                return[]
            }else {
                const publicaciones = await res.json();
                setPublicaciones(publicaciones);
                return publicaciones;
            }
        }catch(err) {
            console.error("Problema al consultar Backen desde la vista fronend:"+err);
        }
    }
    useEffect(() => {
        publicacionesLaterales();
    }, []);

    async function ordenarMayorPrecio(){
        try {
            const res = await fetch(`${API}/producto/ordenarMayor`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })

            if(!res.ok) {
                return toast.error("Ha habido un problema con el filtro de precios; contacte soporte TI de NativeCode.")
             } else {
                const dataProductosMayorPrecio = await res.json();
                setListaProductos(dataProductosMayorPrecio);
            }
        }catch(err){
            console.log(err);
        }
    }
    async function ordenarMenorPrecio(){
        try {
            const res = await fetch(`${API}/producto/ordenarMenor`, {
                method: "GET",
                headers: {Accept: "application/json"},
                mode: "cors"
            })
            if(!res.ok) {
                return toast.error("Ha habido un problema con el filtro de precios; contacte soporte TI de NativeCode.");
             } else{
                const dataProductosMenorPrecio = await res.json();
                setListaProductos(dataProductosMenorPrecio);
            }
        }catch(err){
            console.log(err);
        }
    }




    const contador = listaProductos.length;

    return (
        <>
            {/* DIV PRINCIPAL: Contenedor raíz del catálogo con ancho máximo de 7xl, centrado horizontalmente, padding responsivo y fondo blanco */}
            <div
                className="mt-15 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white"
                style={{
                    "--primary": "oklch(0.56 0.22 260)",
                    "--primary-foreground": "oklch(0.99 0 0)",
                }}
            >


                <div className="block md:hidden">
                    <header className="relative overflow-hidden rounded-[1.9rem] border border-blue-100/70 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-4 py-6 shadow-[0_20px_60px_rgba(37,99,235,0.10)]">
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_70%)]" />
                        <div className="mx-auto max-w-md text-center">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-sm">
                                <Sparkles className="h-3.5 w-3.5" />
                                Catálogo Maxus
                            </div>
                            <h1 className={`${goldman.className} text-[1.85rem] leading-none text-slate-950`}>
                                CATALOGO DE REPUESTOS
                            </h1>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Búsqueda rápida, filtros precisos y una navegación más clara para encontrar tu repuesto.
                            </p>
                        </div>

                        <div className="relative z-10 mt-6 space-y-3">
                            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/95 p-3 shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
                            <InputGroup className="h-13 rounded-2xl border border-blue-100 bg-white transition-colors focus-within:border-blue-500">
                                <InputGroupInput
                                    placeholder="Buscar productos..."
                                    value={tituloProducto}
                                    onChange={e => setTituloProducto(e.target.value)}
                                    className="text-sm"
                                />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton>
                                        <Search className="h-5 w-5 text-slate-400" />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>

                            <div className="mt-3 grid grid-cols-2 gap-3">
                                <ShadcnButton
                                    nombre={"Buscar"}
                                    className="h-12 rounded-2xl border border-blue-300/30 bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_55%,#38bdf8_100%)] text-white shadow-[0_14px_30px_rgba(37,99,235,0.30),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_rgba(37,99,235,0.38),inset_0_1px_0_rgba(255,255,255,0.24)]"
                                    funcion={() => buscarSimilitud(tituloProducto)}
                                />
                                <ShadcnButton
                                    nombre={"Ver todos"}
                                    className="h-12 rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] text-white shadow-[0_14px_28px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_rgba(15,23,42,0.30),inset_0_1px_0_rgba(255,255,255,0.12)]"
                                    funcion={() => listarProductos()}
                                />
                            </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-slate-200/80 bg-white/95 p-3 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                                <div className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                                    <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" />
                                    Filtros de catálogo
                                </div>
                            <div className="grid grid-cols-1 gap-3">
                                <Select onValueChange={(value) => filtrarPorCategoria(value)}>
                                    <SelectTrigger className="h-12 rounded-2xl border-slate-200 text-left font-semibold text-slate-700 shadow-sm">
                                        <SelectValue placeholder="Busca por categoría" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {listaCategorias.map(categoria => (
                                            <SelectItem key={categoria.id_categoriaProducto} value={categoria.id_categoriaProducto}>
                                                {categoria.descripcionCategoria}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                <Select onValueChange={(value) =>{
                                    if(value === "menor"){
                                        ordenarMenorPrecio()
                                    }else if(value === "mayor"){
                                        ordenarMayorPrecio()
                                    }else if(value === "reciente"){
                                        listarRecientes()
                                    }else if(value === "antiguo"){
                                        listarProductos()
                                    }
                                }}>
                                    <SelectTrigger className="h-12 rounded-2xl border-slate-200 text-left font-semibold text-slate-700 shadow-sm">
                                        <SelectValue placeholder="Ordenar por" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="menor">Precio, menor a mayor</SelectItem>
                                        <SelectItem value="mayor">Precio, mayor a menor</SelectItem>
                                        <SelectItem value="reciente">Fecha: reciente a antiguo(a)</SelectItem>
                                        <SelectItem value="antiguo">Fecha: antiguo(a) a reciente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            </div>
                        </div>
                    </header>
                </div>




                {/* Encabezado del catálogo: título, subtítulo, breadcrumb y acciones visuales */}
                <header className="relative mb-8 hidden overflow-hidden rounded-[2.2rem] border border-blue-100/70 bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)] px-8 py-10 shadow-[0_24px_70px_rgba(37,99,235,0.10)] md:block">
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_72%)]" />
                    <div className="pointer-events-none absolute right-[-5%] top-10 h-44 w-44 rounded-full bg-blue-100/50 blur-3xl" />
                    <div className="pointer-events-none absolute left-[-4%] bottom-0 h-40 w-40 rounded-full bg-sky-100/40 blur-3xl" />

                    <div className="relative z-10 mx-auto max-w-5xl text-center">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.26em] text-blue-700 shadow-sm">
                            <Sparkles className="h-3.5 w-3.5" />
                            Catálogo Maxus
                        </div>
                        <h1 className={`${goldman.className} text-4xl leading-none text-slate-950 lg:text-[3.45rem]`}>
                            CATALOGO DE REPUESTOS
                        </h1>
                        <p className="mt-4 text-lg text-slate-600 lg:text-[1.55rem]">
                            Encuentra el repuesto Maxus que deseas
                        </p>
                        <div className="mt-5 flex justify-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                                <Search className="h-3.5 w-3.5 text-blue-600" />
                                Búsqueda directa
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                                <Tags className="h-3.5 w-3.5 text-blue-600" />
                                Filtros por categoría
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 mx-auto mt-8 max-w-5xl">
                        <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/92 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.06)] backdrop-blur-sm">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-4">
                            <InputGroup className="h-14 rounded-2xl border border-blue-100 bg-white shadow-sm transition-colors focus-within:border-blue-500">
                                <InputGroupInput
                                    placeholder="Buscar productos..."
                                    value={tituloProducto}
                                    onChange={e => setTituloProducto(e.target.value)}
                                    className="text-base"
                                />

                                <InputGroupAddon align="inline-end">
                                    <InputGroupButton>
                                        <Search className="h-5 w-5 text-slate-400" />
                                    </InputGroupButton>
                                </InputGroupAddon>
                            </InputGroup>

                            <ShadcnButton
                                nombre={"Buscar"}
                                className="h-14 rounded-2xl border border-blue-300/30 bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_55%,#38bdf8_100%)] px-8 text-white shadow-[0_18px_36px_rgba(37,99,235,0.30),inset_0_1px_0_rgba(255,255,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_44px_rgba(37,99,235,0.38),inset_0_1px_0_rgba(255,255,255,0.24)]"
                                funcion={() => buscarSimilitud(tituloProducto)}
                            />

                            <ShadcnButton
                                nombre={"Ver todos"}
                                className="h-14 rounded-2xl border border-slate-700/80 bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)] px-8 text-white shadow-[0_18px_34px_rgba(15,23,42,0.22),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_42px_rgba(15,23,42,0.30),inset_0_1px_0_rgba(255,255,255,0.12)]"
                                funcion={() => listarProductos()}
                            />
                        </div>

                        <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                            <SlidersHorizontal className="h-3.5 w-3.5 text-blue-600" />
                            Opciones de filtrado
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-4">
                            <Select onValueChange={(value) => filtrarPorCategoria(value)}>
                                <SelectTrigger className="h-14 rounded-2xl border-slate-200 font-semibold text-slate-700 shadow-sm">
                                    <SelectValue placeholder="Busca por categoría" />
                                </SelectTrigger>
                                <SelectContent>
                                    {listaCategorias.map(categoria => (
                                        <SelectItem key={categoria.id_categoriaProducto} value={categoria.id_categoriaProducto}>
                                            {categoria.descripcionCategoria}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(value) =>{
                                if(value === "menor"){
                                    ordenarMenorPrecio()
                                }else if(value === "mayor"){
                                    ordenarMayorPrecio()
                                }else if(value === "reciente"){
                                    listarRecientes()
                                }else if(value === "antiguo"){
                                    listarProductos()
                                }
                            }}>
                                <SelectTrigger className="h-14 rounded-2xl border-slate-200 font-semibold text-slate-700 shadow-sm">
                                    <SelectValue placeholder="Ordenar por" />
                                </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="menor">Precio, menor a mayor</SelectItem>
                                        <SelectItem value="mayor">Precio, mayor a menor</SelectItem>
                                        <SelectItem value="reciente">Fecha: reciente a antiguo(a)</SelectItem>
                                        <SelectItem value="antiguo">Fecha: antiguo(a) a reciente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </header>



                <div className="flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
                            Selección de repuestos
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Productos disponibles para compra online
                        </p>
                    </div>
                    <Badge className="border-primary/15 bg-primary/10 px-3.5 py-1.5 font-bold text-primary">
                        {contador} {contador === 1 ? "producto" : "productos"}
                    </Badge>
                </div>

                {/* Separador sutil entre encabezado y contenido */}
                <Separator className="my-6" />


                {/* DIV LAYOUT PRINCIPAL: Grid responsivo que divide la página en 1 columna móvil y 5 columnas escritorio (1 sidebar + 4 productos) */}

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">



                    {/* Sidebar de categorías - Diseño profesional y moderno */}
                    <aside className="
                    hidden md:block
                    sticky top-5 self-start h-fit">



                        {/* DIV CARD CATEGORÍAS: Contenedor principal con efecto glassmorphism, gradiente y sombras para el panel de categorías */}
                        <div className="
                        backdrop-blur-xl
                        bg-gradient-to-br from-blue-50/95 via-white/90 to-blue-100/95
                        rounded-2xl
                        border-2 border-blue-200/40
                        shadow-xl shadow-blue-900/10
                        p-6
                        transition-all duration-300
                        hover:shadow-2xl hover:shadow-blue-900/15">

                            {/* DIV HEADER CATEGORÍAS: Encabezado con barra de acento, título y contador de categorías */}
                            <div className="flex items-center gap-3 mb-6 pb-5 border-b-2 border-blue-200/50">
                                {/* DIV BARRA DECORATIVA: Línea vertical con gradiente azul que sirve como elemento visual de diseño */}
                                <div className=" bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900 rounded-full shadow-md shadow-blue-600/50"></div>
                                {/* DIV TEXTOS HEADER: Contenedor flex que agrupa título y subtítulo del panel de categorías */}
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-blue-900 tracking-tight">Categorías</h3>
                                    <p className="text-xs text-blue-700/70 mt-1 font-medium">Filtra por categoría</p>
                                </div>
                            </div>

                            {/* DIV CONTENEDOR DE BOTONES: Agrupa todos los botones de categorías en una columna con espaciado */}
                            <div className="flex flex-col gap-2.5">

                                {/* Botón "Ver Todos" destacado con gradiente */}
                                <button
                                    key={"key"}
                                    type="button"
                                    onClick={() => listarProductos()}
                                    className="
                                    group relative overflow-hidden
                                    w-full p-2
                                    bg-gradient-to-r from-blue-800 via-blue-900 to-blue-950
                                    text-white font-bold text-sm
                                    shadow-lg shadow-blue-900/40
                                    rounded-4
                                    transition-all duration-300
                                    hover:shadow-xl hover:shadow-blue-900/50
                                    hover:scale-[1.02]
                                    active:scale-[0.98]
                                    focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2.5">
                                        {/* Icono de grid */}
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                        <span className="tracking-wide">Ver Todos </span>
                                    </span>
                                    {/* Efecto de brillo al hover */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </button>




                                {/* DIV SEPARADOR DECORATIVO: Línea horizontal con texto central que divide el botón "Ver Todos" de las categorías */}
                                <div className="flex items-center gap-2 my-3">
                                    {/* DIV LÍNEA IZQUIERDA: Línea decorativa con gradiente que se desvanece hacia los bordes */}
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                                    <span className="text-xs text-blue-600 font-semibold px-2 py-0.5 bg-blue-50 rounded-full">
                                        o selecciona
                                    </span>
                                    {/* DIV LÍNEA DERECHA: Línea decorativa con gradiente que equilibra visualmente el separador */}
                                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
                                </div>

                                {/* DIV LISTA CATEGORÍAS: Contenedor vertical que aloja todos los botones individuales de categorías con animación */}
                                <div className="flex flex-col gap-2">
                                    {listaCategorias.map((categoria, index) => (
                                        <motion.button
                                            key={categoria.id_categoriaProducto}
                                            type="button"
                                            onClick={() => filtrarPorCategoria(categoria.id_categoriaProducto)}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.04 }}
                                            className="
                                            group
                                            w-full p-2
                                            bg-white/80 hover:bg-white
                                            backdrop-blur-sm
                                            border-2 border-blue-200/60 hover:border-blue-600
                                            text-blue-900 hover:text-blue-700
                                            font-semibold text-sm text-left
                                            rounded-4
                                            shadow-sm hover:shadow-md
                                            transition-all duration-300
                                            hover:scale-[1.02]
                                            active:scale-[0.98]
                                            focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        >
                                            <span className="flex items-center justify-between">
                                                <span className="flex items-center gap-3">
                                                    {/* Punto decorativo que cambia de color */}
                                                    <span className="w-2 h-2 rounded-full bg-blue-400 group-hover:bg-blue-600 transition-colors duration-300 shadow-sm group-hover:shadow-md group-hover:shadow-blue-500/50"></span>
                                                    <span className="tracking-tight">{categoria.descripcionCategoria}</span>
                                                </span>
                                                {/* Flecha que se mueve al hover */}
                                                <svg
                                                    className="w-4 h-4 text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 pt-5 border-t-2 border-blue-200/50">
                                {/* DIV INFO FOOTER: Badge informativo que muestra estadísticas de categorías disponibles con icono */}
                                <div className="flex items-center gap-2.5 text-xs text-blue-700/80 bg-blue-50/50 rounded-lg px-3 py-2">
                                    <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium">
                                        <span className="font-bold text-blue-900">{listaCategorias.length}</span> categorías disponibles
                                    </span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <section className="grid h-full min-w-0 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:col-span-4 lg:grid-cols-4 lg:gap-5">
                        {listaProductos.map((producto) => (
                            <ProductCard
                                key={producto.id_producto}
                                producto={producto}
                                onView={verProducto}
                                onAdd={agregarAlCarrito}
                                onBuy={comprarAhora}
                            />
                        ))}
                    </section>







                </div>
            </div>
        </>
    )

}
