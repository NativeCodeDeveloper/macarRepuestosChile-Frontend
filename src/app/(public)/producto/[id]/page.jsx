"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
    ArrowLeft,
    ArrowRight,
    BadgeCheck,
    Check,
    CircleAlert,
    CreditCard,
    MessageCircle,
    PackageCheck,
    ShieldCheck,
    ShoppingCart,
    Truck,
} from "lucide-react";
import CarruselProducto from "@/Componentes/CarruselProducto";
import { useCarritoGlobal } from "@/ContextosGlobales/CarritoContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const formatoPrecioCLP = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
});

const beneficiosCompra = [
    {
        icon: BadgeCheck,
        title: "Calidad garantizada",
        description: "Repuestos seleccionados",
    },
    {
        icon: Truck,
        title: "Envíos a todo Chile",
        description: "Despacho coordinado",
    },
    {
        icon: ShieldCheck,
        title: "Compra 100% segura",
        description: "Asesoría especializada",
    },
];

const pasosTransferencia = [
    "Escanea el QR y realiza el pago.",
    "Envía el comprobante al +56 9 9504 3704.",
    "Confirmamos y enviamos tu repuesto.",
];

function ProductoSkeleton() {
    return (
        <div className="mx-auto w-full max-w-[1500px] px-4 py-8 sm:px-6">
            <Skeleton className="mb-5 h-9 w-44" />
            <Card className="gap-0 overflow-hidden rounded-3xl py-0">
                <CardContent className="grid gap-0 p-0 xl:grid-cols-3">
                    {[0, 1, 2].map((item) => (
                        <div
                            key={item}
                            className="flex min-h-[34rem] flex-col gap-5 border-b p-6 xl:border-b-0 xl:border-r last:xl:border-r-0"
                        >
                            <Skeleton className="h-7 w-40" />
                            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                            <Skeleton className="h-20 w-full rounded-2xl" />
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="grid gap-3 border-t p-5 sm:grid-cols-2 xl:grid-cols-4">
                    {[0, 1, 2, 3].map((item) => (
                        <Skeleton key={item} className="h-12 w-full" />
                    ))}
                </CardFooter>
            </Card>
        </div>
    );
}

function BeneficioResumen({ icon: Icon, title, description }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
                <p className="text-xs font-black leading-4 text-foreground">{title}</p>
                <p className="mt-0.5 text-[0.65rem] leading-4 text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function ProductoDetalle() {
    const [, setCarrito] = useCarritoGlobal();
    const router = useRouter();
    const params = useParams();
    const idProducto = params?.id;
    const API = process.env.NEXT_PUBLIC_API_URL;
    const CLOUDFLARE_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_HASH;

    const [producto, setProducto] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [cantidadSeleccionada, setCantidadSeleccionada] = useState("1");

    useEffect(() => {
        if (!idProducto || !API) {
            setError("No pudimos identificar el producto solicitado.");
            setIsLoading(false);
            return undefined;
        }

        const controller = new AbortController();

        async function cargarProducto() {
            setIsLoading(true);
            setError("");

            try {
                const response = await fetch(`${API}/producto/${idProducto}`, {
                    method: "GET",
                    headers: { Accept: "application/json" },
                    mode: "cors",
                    signal: controller.signal,
                });

                if (!response.ok) {
                    throw new Error("No fue posible cargar el producto.");
                }

                const data = await response.json();
                setProducto(data);
            } catch (fetchError) {
                if (fetchError.name === "AbortError") return;
                console.error("Error al cargar el producto:", fetchError);
                setError(
                    "No pudimos cargar esta ficha. Intenta nuevamente en unos minutos."
                );
            } finally {
                if (!controller.signal.aborted) setIsLoading(false);
            }
        }

        cargarProducto();

        return () => controller.abort();
    }, [API, idProducto]);

    const imagenesProducto = useMemo(() => {
        if (!producto || !CLOUDFLARE_HASH) return [];

        return [
            producto.imagenProducto,
            producto.imagenProductoSegunda,
            producto.imagenProductoTercera,
            producto.imagenProductoCuarta,
        ]
            .filter(Boolean)
            .map(
                (imagen) =>
                    `https://imagedelivery.net/${CLOUDFLARE_HASH}/${imagen}/full`
            );
    }, [
        CLOUDFLARE_HASH,
        producto?.imagenProducto,
        producto?.imagenProductoCuarta,
        producto?.imagenProductoSegunda,
        producto?.imagenProductoTercera,
    ]);

    const opcionesCantidad = useMemo(() => {
        const stockDisponible = Number(producto?.cantidadStock) || 0;
        const cantidadMaxima = Math.min(stockDisponible, 10);

        return Array.from(
            { length: cantidadMaxima },
            (_, indice) => String(indice + 1)
        );
    }, [producto?.cantidadStock]);

    function agregarAlCarrito(productoSeleccionado) {
        if (!productoSeleccionado || Number(productoSeleccionado.cantidadStock) < 1) {
            toast.error("Este producto no tiene stock disponible.");
            return false;
        }

        const cantidad = Number(cantidadSeleccionada) || 1;

        if (cantidad > Number(productoSeleccionado.cantidadStock)) {
            toast.error("La cantidad seleccionada supera el stock disponible.");
            return false;
        }

        const productosAgregados = Array.from(
            { length: cantidad },
            () => ({ ...productoSeleccionado })
        );

        setCarrito((productosPrevios) => [
            ...productosPrevios,
            ...productosAgregados,
        ]);
        toast.success(
            cantidad === 1
                ? "Producto añadido al carrito."
                : `${cantidad} unidades añadidas al carrito.`
        );
        return true;
    }

    function comprarAhora(productoSeleccionado) {
        try {
            if (agregarAlCarrito(productoSeleccionado)) {
                router.push("/carrito");
            }
        } catch (purchaseError) {
            console.error("Error al comprar el producto:", purchaseError);
            toast.error(
                "No pudimos iniciar la compra. Contacta a un especialista."
            );
        }
    }

    if (isLoading) {
        return (
            <main className="min-h-screen bg-muted/35">
                <ProductoSkeleton />
            </main>
        );
    }

    if (error || !producto) {
        return (
            <main className="flex min-h-[70svh] items-center justify-center bg-muted/35 px-4 py-12">
                <Card className="w-full max-w-xl">
                    <CardHeader>
                        <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
                            <CircleAlert className="size-6" aria-hidden="true" />
                        </div>
                        <CardTitle className="text-2xl">
                            No pudimos mostrar este producto
                        </CardTitle>
                        <CardDescription className="leading-6">
                            {error || "La ficha solicitada no está disponible."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm leading-6 text-muted-foreground">
                            Puedes volver al catálogo o hablar directamente con nuestro
                            equipo para encontrar el repuesto que necesitas.
                        </p>
                    </CardContent>
                    <CardFooter className="flex-col gap-3 border-t sm:flex-row">
                        <Button asChild variant="outline" className="w-full sm:flex-1">
                            <Link href="/catalogo">
                                <ArrowLeft data-icon="inline-start" />
                                Volver al catálogo
                            </Link>
                        </Button>
                        <Button asChild className="w-full sm:flex-1">
                            <a
                                href="https://wa.me/56995043704"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle data-icon="inline-start" />
                                Hablar con un especialista
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            </main>
        );
    }

    const stock = Number(producto.cantidadStock) || 0;
    const sinStock = stock < 1;
    const esOferta = Number(producto.estadoProducto) === 3;
    const tituloProducto = producto.tituloProducto || "Repuesto Maxus";
    const descripcionProducto =
        producto.descripcionProducto ||
        "Consulta con nuestro equipo para conocer más detalles y confirmar la compatibilidad de este repuesto.";
    const consultaCompatibilidad = `https://wa.me/56995043704?text=${encodeURIComponent(
        `Hola, necesito confirmar la compatibilidad del producto "${tituloProducto}".`
    )}`;
    const enviarComprobanteUrl = `https://wa.me/56995043704?text=${encodeURIComponent(
        `Hola, realicé el pago directo Transbank del producto "${tituloProducto}". Adjunto la foto del comprobante para coordinar el envío de mi repuesto.`
    )}`;

    return (
        <main
            className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_44%,#f8fafc_100%)]"
            style={{
                "--primary": "oklch(0.56 0.22 260)",
                "--primary-foreground": "oklch(0.99 0 0)",
            }}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(15,23,42,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.6)_1px,transparent_1px)] [background-size:72px_72px]"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -right-32 top-10 size-[28rem] rounded-full bg-primary/5 blur-3xl"
                aria-hidden="true"
            />

            <div className="relative mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:py-7">
                <Button asChild variant="ghost" className="mb-4">
                    <Link href="/catalogo">
                        <ArrowLeft data-icon="inline-start" />
                        Volver al catálogo
                    </Link>
                </Button>

                <Card className="gap-0 overflow-hidden rounded-[1.75rem] border-border/80 bg-card/95 py-0 shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
                    <CardContent className="p-0">
                        <div className="grid xl:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)_minmax(22rem,0.78fr)]">
                            <section className="order-2 flex min-w-0 flex-col border-b p-4 sm:p-5 xl:order-1 xl:min-h-[39rem] xl:border-b-0 xl:border-r">
                                <CarruselProducto
                                    imagenes={imagenesProducto}
                                    tituloProducto={tituloProducto}
                                />

                                <div
                                    className={
                                        sinStock
                                            ? "mt-4 flex items-center gap-3 rounded-2xl border border-destructive/15 bg-destructive/5 px-4 py-3"
                                            : "mt-4 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 px-4 py-3"
                                    }
                                >
                                    <div
                                        className={
                                            sinStock
                                                ? "flex size-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
                                                : "flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700"
                                        }
                                    >
                                        {sinStock ? (
                                            <CircleAlert
                                                className="size-5"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <PackageCheck
                                                className="size-5"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-foreground">
                                            {sinStock
                                                ? "Temporalmente sin stock"
                                                : stock === 1
                                                    ? "Última unidad disponible"
                                                    : `${stock} unidades disponibles`}
                                        </p>
                                        <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                                            {sinStock
                                                ? "Consulta con un especialista por reposición."
                                                : "Listo para añadir al carrito y continuar la compra."}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section className="order-1 flex min-w-0 flex-col border-b p-5 sm:p-7 xl:order-2 xl:min-h-[39rem] xl:border-b-0 xl:border-r">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge className="border-primary/15 bg-primary/10 font-bold uppercase tracking-[0.12em] text-primary">
                                        {esOferta ? "Oferta especial" : "Repuesto Maxus"}
                                    </Badge>
                                    <Badge
                                        className={
                                            sinStock
                                                ? "border-destructive/20 bg-destructive/10 text-destructive"
                                                : "border-emerald-200 bg-emerald-50 text-emerald-700"
                                        }
                                    >
                                        {sinStock ? "Sin stock" : "Disponible"}
                                    </Badge>
                                </div>

                                <h1 className="mt-7 text-3xl font-black leading-[1.08] tracking-[-0.04em] text-foreground sm:text-4xl">
                                    {tituloProducto}
                                </h1>
                                <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-base">
                                    {descripcionProducto}
                                </p>

                                <Separator className="my-8" />

                                <div className="grid gap-5 sm:grid-cols-3">
                                    {beneficiosCompra.map((beneficio) => (
                                        <BeneficioResumen
                                            key={beneficio.title}
                                            {...beneficio}
                                        />
                                    ))}
                                </div>

                                <div className="mt-auto pt-8">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        className="w-full justify-start whitespace-normal text-left text-muted-foreground"
                                    >
                                        <a
                                            href={consultaCompatibilidad}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <MessageCircle data-icon="inline-start" />
                                            ¿No estás seguro? Confirma compatibilidad con un
                                            especialista.
                                        </a>
                                    </Button>
                                </div>
                            </section>

                            <aside className="order-3 flex min-w-0 flex-col bg-muted/15 p-5 xl:min-h-[39rem]">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                                        Precio
                                    </p>
                                    <p className="mt-1 truncate text-4xl font-black tracking-[-0.045em] text-primary sm:text-5xl">
                                        {formatoPrecioCLP.format(
                                            Number(producto.valorProducto) || 0
                                        )}
                                    </p>

                                    <Image
                                        src="/webpay.png"
                                        alt="Webpay Transbank"
                                        width={420}
                                        height={124}
                                        className="mt-3 h-auto w-full max-w-[14rem] object-contain"
                                    />
                                </div>

                                <div className="mt-4 rounded-2xl border border-border bg-background p-3 text-center shadow-sm">
                                    <p className="text-xs font-black uppercase tracking-[0.14em] text-muted-foreground">
                                        Pago directo
                                    </p>
                                    <Image
                                        src="/qr.png"
                                        alt="Código QR para realizar el pago directo"
                                        width={150}
                                        height={142}
                                        className="mx-auto mt-2 aspect-square w-32 rounded-xl bg-white object-contain sm:w-36"
                                    />
                                </div>

                                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-background">
                                    <div className="bg-slate-950 px-4 py-3 text-white">
                                        <p className="text-xs font-black uppercase tracking-[0.12em]">
                                            Dos formas de pago
                                        </p>
                                        <p className="mt-1 text-[0.68rem] text-white/70">
                                            Elige cómo quieres pagar
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 p-2.5">
                                        <div className="flex min-w-0 flex-col rounded-xl border border-border p-2.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[0.62rem] font-bold text-muted-foreground">
                                                    Opción 1
                                                </span>
                                                <CreditCard
                                                    className="size-4 text-primary"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <p className="mt-2 text-xs font-black leading-4">
                                                Transferencia directa
                                            </p>
                                            <ol className="mt-2 grid gap-1.5">
                                                {pasosTransferencia.map((paso, index) => (
                                                    <li
                                                        key={paso}
                                                        className="flex gap-1.5 text-[0.58rem] leading-3.5 text-muted-foreground"
                                                    >
                                                        <span className="font-black text-primary">
                                                            {index + 1}.
                                                        </span>
                                                        <span>{paso}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                            <Button
                                                asChild
                                                variant="outline"
                                                size="sm"
                                                className="mt-auto w-full px-2 text-[0.62rem]"
                                            >
                                                <a
                                                    href={enviarComprobanteUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    Enviar comprobante
                                                </a>
                                            </Button>
                                        </div>

                                        <div className="flex min-w-0 flex-col rounded-xl border border-border p-2.5">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[0.62rem] font-bold text-muted-foreground">
                                                    Opción 2
                                                </span>
                                                <Image
                                                    src="/MP_RGB_HANDSHAKE_color_horizontal.svg"
                                                    alt="Mercado Pago"
                                                    width={82}
                                                    height={21}
                                                    className="h-auto w-16 object-contain"
                                                />
                                            </div>
                                            <p className="mt-2 text-xs font-black leading-4">
                                                Mercado Pago por el carrito
                                            </p>
                                            <p className="mt-2 text-[0.62rem] leading-4 text-muted-foreground">
                                                Paga online de forma segura mediante el carrito
                                                normal.
                                            </p>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                disabled={sinStock}
                                                onClick={() => comprarAhora(producto)}
                                                className="mt-auto w-full px-2 text-[0.62rem]"
                                            >
                                                Usar Mercado Pago
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </CardContent>

                    <CardFooter className="grid gap-3 border-t bg-background/95 px-5 !pt-4 pb-4 sm:px-6 lg:grid-cols-[8rem_minmax(0,1fr)_minmax(0,1fr)_minmax(15rem,0.9fr)]">
                        <div>
                            <label
                                htmlFor="cantidad-producto"
                                className="mb-1.5 block text-xs font-bold text-muted-foreground"
                            >
                                Cantidad
                            </label>
                            <Select
                                value={cantidadSeleccionada}
                                onValueChange={setCantidadSeleccionada}
                                disabled={sinStock}
                            >
                                <SelectTrigger
                                    id="cantidad-producto"
                                    className="h-11 w-full bg-background"
                                    aria-label="Seleccionar cantidad"
                                >
                                    <SelectValue placeholder="1" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {opcionesCantidad.map((cantidad) => (
                                            <SelectItem key={cantidad} value={cantidad}>
                                                {cantidad}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            disabled={sinStock}
                            onClick={() => agregarAlCarrito(producto)}
                            className="h-12 w-full self-end"
                        >
                            <ShoppingCart data-icon="inline-start" />
                            Añadir al carrito
                        </Button>

                        <Button
                            type="button"
                            size="lg"
                            disabled={sinStock}
                            onClick={() => comprarAhora(producto)}
                            className="h-12 w-full self-end"
                        >
                            Comprar ahora
                            <ArrowRight data-icon="inline-end" />
                        </Button>

                        <div className="flex min-h-12 items-center gap-3 self-end rounded-xl bg-muted/35 px-3 py-2">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <ShieldCheck className="size-4" aria-hidden="true" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-foreground">
                                    Compra segura y protegida
                                </p>
                                <p className="mt-0.5 text-[0.65rem] leading-4 text-muted-foreground">
                                    Tus datos y pagos están protegidos.
                                </p>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}
