"use client"

import {useState, useEffect, useRef, Suspense} from 'react';
import { toast } from 'react-hot-toast';
import {useCarritoGlobal} from "@/ContextosGlobales/CarritoContext";
import MediaCardImage from "@/Componentes/MediaCardImage";
import {useRouter} from "next/navigation";


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {Goldman} from "next/font/google"


import {useSearchParams} from "next/navigation"

import {
    InputGroup,
    InputGroupInput,
    InputGroupAddon,
} from "@/components/ui/input-group"

import {
    ArrowUpRight,
    Boxes,
    Check,
    ChevronRight,
    Grid2X2,
    MessageCircle,
    PackageSearch,
    Search,
    ShoppingCart,
    SlidersHorizontal,
    Sparkles,
    Tags,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

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
            className="group min-w-0 self-start gap-0 overflow-hidden rounded-[1.35rem] border-border/80 bg-card py-0 shadow-[0_12px_35px_rgba(15,23,42,0.08)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_55px_rgba(15,23,42,0.16)]"
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

            <CardContent className="mt-auto px-3 pb-3 pt-3 [container-type:inline-size] md:px-4 md:pb-4">
                <div>
                    <p className="text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:text-[0.65rem]">
                        Precio
                    </p>
                    <p className="mt-1 whitespace-nowrap text-[clamp(0.8rem,11cqw,1.25rem)] font-black leading-none tabular-nums tracking-[-0.03em] text-primary">
                        {formatoPrecioCLP.format(Number(producto.valorProducto) || 0)}
                    </p>

                    <span className="mt-1.5 hidden w-full items-center gap-1.5 text-[0.65rem] font-semibold text-muted-foreground xl:flex">
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

function CatalogHero({
    tituloProducto,
    setTituloProducto,
    listaCategorias,
    onSearch,
    onShowAll,
    onCategoryChange,
    onSortChange,
}) {
    return (
        <header className="relative mb-8 overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground text-background shadow-[0_28px_80px_rgba(15,23,42,0.20)]">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.45)_1px,transparent_1px)] [background-size:34px_34px]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-y-0 left-0 w-[42%] bg-[linear-gradient(110deg,rgba(37,99,235,0.22),transparent_72%)]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.16),transparent_68%)]"
                aria-hidden="true"
            />

            <div className="relative grid lg:grid-cols-[minmax(0,0.78fr)_minmax(36rem,1.22fr)]">
                <div className="flex flex-col justify-between gap-8 px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <div className="flex flex-col items-start gap-5">
                        <Badge
                            variant="secondary"
                            className="border border-background/15 bg-background/10 px-3 py-1 text-background shadow-none"
                        >
                            <Sparkles aria-hidden="true" />
                            Repuestos Maxus · Chile
                        </Badge>

                        <div className="flex flex-col gap-4">
                            <h1 className={`${goldman.className} max-w-xl text-[2.35rem] leading-[0.94] tracking-[-0.045em] sm:text-5xl lg:text-[3.35rem]`}>
                                CATÁLOGO DE
                                <span className="block text-primary">REPUESTOS</span>
                            </h1>
                            <p className="max-w-md text-sm leading-6 text-background/65 sm:text-base">
                                Encuentra rápidamente la pieza que necesitas por nombre
                                o categoría.
                            </p>
                        </div>
                    </div>

                    <div className="grid max-w-md grid-cols-2 gap-5 border-t border-background/10 pt-5">
                        <div className="flex items-start gap-3">
                            <Search className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                            <div>
                                <p className="text-xs font-bold text-background">Búsqueda directa</p>
                                <p className="mt-1 text-[0.68rem] leading-4 text-background/50">
                                    Por nombre o repuesto
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Tags className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                            <div>
                                <p className="text-xs font-bold text-background">Categorías precisas</p>
                                <p className="mt-1 text-[0.68rem] leading-4 text-background/50">
                                    Filtra solo lo necesario
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 pt-0 sm:p-5 sm:pt-0 lg:p-6">
                    <Card className="gap-0 overflow-hidden rounded-[1.6rem] border-0 bg-card py-0 text-card-foreground shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
                        <CardHeader className="gap-2 border-b px-5 py-5 sm:px-6">
                            <div className="flex items-center justify-between gap-3">
                                <p className="flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-primary">
                                    <PackageSearch className="size-4" aria-hidden="true" />
                                    Buscador de repuestos
                                </p>
                                <Badge variant="outline" className="hidden sm:inline-flex">
                                    {listaCategorias.length} categorías
                                </Badge>
                            </div>
                            <CardTitle className="text-xl font-black tracking-[-0.025em] sm:text-2xl">
                                ¿Qué repuesto necesitas?
                            </CardTitle>
                            <CardDescription>
                                Escribe el nombre de la pieza o explora las categorías.
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex flex-col gap-5 px-5 py-5 sm:px-6 sm:py-6">
                            <div className="flex flex-col gap-2 sm:flex-row">
                                <InputGroup className="h-12 flex-1 rounded-xl bg-background shadow-sm">
                                    <InputGroupInput
                                        placeholder="Ej: kit de filtros T60"
                                        value={tituloProducto}
                                        onChange={(event) => setTituloProducto(event.target.value)}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                onSearch();
                                            }
                                        }}
                                        aria-label="Buscar productos"
                                    />
                                    <InputGroupAddon align="inline-start">
                                        <Search aria-hidden="true" />
                                    </InputGroupAddon>
                                </InputGroup>

                                <Button
                                    type="button"
                                    size="lg"
                                    className="h-12 rounded-xl px-6"
                                    onClick={onSearch}
                                >
                                    <Search data-icon="inline-start" aria-hidden="true" />
                                    Buscar
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="h-12 rounded-xl px-5"
                                    onClick={onShowAll}
                                >
                                    Ver todos
                                </Button>
                            </div>

                            <Separator />

                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="size-4 text-primary" aria-hidden="true" />
                                    <p className="text-[0.65rem] font-black uppercase tracking-[0.17em] text-muted-foreground">
                                        Afinar resultados
                                    </p>
                                </div>

                                <div className="grid gap-3 sm:grid-cols-2">
                                    <Select onValueChange={onCategoryChange}>
                                        <SelectTrigger className="h-11 w-full rounded-xl">
                                            <SelectValue placeholder="Todas las categorías" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {listaCategorias.map((categoria) => (
                                                    <SelectItem
                                                        key={categoria.id_categoriaProducto}
                                                        value={String(categoria.id_categoriaProducto)}
                                                    >
                                                        {categoria.descripcionCategoria}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Select onValueChange={onSortChange}>
                                        <SelectTrigger className="h-11 w-full rounded-xl">
                                            <SelectValue placeholder="Ordenar resultados" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="menor">Precio: menor a mayor</SelectItem>
                                                <SelectItem value="mayor">Precio: mayor a menor</SelectItem>
                                                <SelectItem value="reciente">Más recientes primero</SelectItem>
                                                <SelectItem value="antiguo">Más antiguos primero</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </header>
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
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const resultadosRef = useRef(null);

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
                    setCategoriaSeleccionada(null);
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
            setCategoriaSeleccionada(null);
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
    async function filtrarPorCategoria(categoriaProducto, desplazarResultados = false){
   try {
       if(!categoriaProducto){
           return;
       }
       setCategoriaSeleccionada(String(categoriaProducto));
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
       if (desplazarResultados) {
           window.requestAnimationFrame(() => {
               resultadosRef.current?.scrollIntoView({
                   behavior: "auto",
                   block: "start",
               });
           });
       }

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
            setCategoriaSeleccionada(null);
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
            setCategoriaSeleccionada(null);
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
            setCategoriaSeleccionada(null);
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
            setCategoriaSeleccionada(null);
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


                <CatalogHero
                    tituloProducto={tituloProducto}
                    setTituloProducto={setTituloProducto}
                    listaCategorias={listaCategorias}
                    onSearch={() => buscarSimilitud(tituloProducto)}
                    onShowAll={listarProductos}
                    onCategoryChange={(value) => filtrarPorCategoria(value, true)}
                    onSortChange={(value) => {
                        if (value === "menor") {
                            ordenarMenorPrecio();
                        } else if (value === "mayor") {
                            ordenarMayorPrecio();
                        } else if (value === "reciente") {
                            listarRecientes();
                        } else if (value === "antiguo") {
                            listarProductos();
                        }
                    }}
                />



                <div
                    ref={resultadosRef}
                    className="scroll-mt-24 flex w-full flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4"
                >
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

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
                    <aside className="sticky top-24 hidden h-fit self-start lg:block">
                        <Card className="gap-0 overflow-hidden rounded-[1.6rem] border-border/80 bg-card py-0 shadow-[0_18px_55px_rgba(15,23,42,0.10)]">
                            <CardHeader className="relative overflow-hidden border-b bg-slate-950 px-5 py-5 text-white">
                                <div
                                    className="pointer-events-none absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.35)_1px,transparent_1px)] [background-size:28px_28px]"
                                    aria-hidden="true"
                                />
                                <div className="relative flex items-start justify-between gap-3">
                                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
                                        <PackageSearch className="size-5" aria-hidden="true" />
                                    </div>
                                    <Badge className="border-white/15 bg-white/10 text-white">
                                        {listaCategorias.length} disponibles
                                    </Badge>
                                </div>
                                <CardTitle className="relative mt-4 text-xl font-black tracking-[-0.025em]">
                                    Explora por categoría
                                </CardTitle>
                                <CardDescription className="relative leading-5 text-white/60">
                                    Encuentra rápidamente la familia de repuestos que
                                    necesitas.
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="p-3">
                                <Button
                                    type="button"
                                    variant={categoriaSeleccionada === null ? "default" : "outline"}
                                    onClick={() => listarProductos()}
                                    aria-pressed={categoriaSeleccionada === null}
                                    className="h-auto w-full justify-start rounded-xl px-3 py-3"
                                >
                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background/15">
                                        <Grid2X2 aria-hidden="true" />
                                    </span>
                                    <span className="min-w-0 flex-1 text-left">
                                        <span className="block font-black">Todos los repuestos</span>
                                        <span
                                            className={cn(
                                                "mt-0.5 block text-[0.62rem] font-medium",
                                                categoriaSeleccionada === null
                                                    ? "text-primary-foreground/65"
                                                    : "text-muted-foreground"
                                            )}
                                        >
                                            Ver el catálogo completo
                                        </span>
                                    </span>
                                    {categoriaSeleccionada === null ? (
                                        <Check aria-hidden="true" />
                                    ) : (
                                        <ChevronRight aria-hidden="true" />
                                    )}
                                </Button>

                                <div className="my-3 flex items-center gap-3">
                                    <Separator className="flex-1" />
                                    <span className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                                        Categorías
                                    </span>
                                    <Separator className="flex-1" />
                                </div>

                                <nav
                                    className="flex max-h-[calc(100vh-25rem)] flex-col gap-1 overflow-y-auto pr-1"
                                    aria-label="Categorías del catálogo"
                                >
                                    {listaCategorias.map((categoria, index) => {
                                        const estaActiva =
                                            categoriaSeleccionada ===
                                            String(categoria.id_categoriaProducto);

                                        return (
                                            <Button
                                                key={categoria.id_categoriaProducto}
                                                type="button"
                                                variant="ghost"
                                                onClick={() =>
                                                    filtrarPorCategoria(
                                                        categoria.id_categoriaProducto,
                                                        true
                                                    )
                                                }
                                                aria-pressed={estaActiva}
                                                className={cn(
                                                    "group h-auto w-full justify-start whitespace-normal rounded-xl px-2.5 py-2.5 text-left",
                                                    estaActiva
                                                        ? "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                                                        : "text-foreground hover:bg-muted"
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        "flex size-8 shrink-0 items-center justify-center rounded-lg border text-[0.62rem] font-black",
                                                        estaActiva
                                                            ? "border-primary/20 bg-primary text-primary-foreground"
                                                            : "border-border bg-muted text-muted-foreground group-hover:border-primary/20 group-hover:text-primary"
                                                    )}
                                                >
                                                    {estaActiva ? (
                                                        <Check aria-hidden="true" />
                                                    ) : (
                                                        String(index + 1).padStart(2, "0")
                                                    )}
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="block text-xs font-bold leading-4">
                                                        {categoria.descripcionCategoria}
                                                    </span>
                                                    {estaActiva ? (
                                                        <span className="mt-0.5 block text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-primary/70">
                                                            Filtro activo
                                                        </span>
                                                    ) : null}
                                                </span>
                                                <ChevronRight
                                                    className={cn(
                                                        "transition-transform duration-200 group-hover:translate-x-0.5",
                                                        estaActiva
                                                            ? "text-primary"
                                                            : "text-muted-foreground"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </Button>
                                        );
                                    })}
                                </nav>
                            </CardContent>

                            <CardFooter className="flex-col items-stretch gap-3 border-t bg-muted/35 px-4 py-4">
                                <div className="flex items-start gap-3">
                                    <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Boxes className="size-4" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-foreground">
                                            ¿No encuentras tu repuesto?
                                        </p>
                                        <p className="mt-1 text-[0.65rem] leading-4 text-muted-foreground">
                                            Un especialista puede ayudarte a identificarlo.
                                        </p>
                                    </div>
                                </div>
                                <Button asChild variant="outline" size="sm" className="w-full">
                                    <a
                                        href="https://wa.me/56995043704"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <MessageCircle data-icon="inline-start" />
                                        Consultar por WhatsApp
                                    </a>
                                </Button>
                            </CardFooter>
                        </Card>
                    </aside>

                    <section className="grid min-w-0 auto-rows-max content-start items-start grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4 xl:gap-5">
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
