"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function CarruselProducto({
    imagenes,
    imagen1,
    imagen2,
    imagen3,
    imagen4,
    tituloProducto = "Producto",
}) {
    const imagenesFinal = useMemo(() => {
        if (Array.isArray(imagenes) && imagenes.length > 0) {
            return imagenes
                .filter(
                    (imagen) =>
                        typeof imagen === "string" && imagen.trim() !== ""
                )
                .slice(0, 4);
        }

        return [imagen1, imagen2, imagen3, imagen4].filter(
            (imagen) =>
                typeof imagen === "string" && imagen.trim() !== ""
        );
    }, [imagenes, imagen1, imagen2, imagen3, imagen4]);

    const [actual, setActual] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [imagenesOk, setImagenesOk] = useState([]);

    useEffect(() => {
        let cancelado = false;

        setCargando(true);
        setImagenesOk([]);
        setActual(0);

        async function validarImagenes() {
            if (!imagenesFinal.length) {
                if (!cancelado) setCargando(false);
                return;
            }

            const resultados = await Promise.all(
                imagenesFinal.map(
                    (src) =>
                        new Promise((resolve) => {
                            const imagen = new window.Image();
                            imagen.onload = () => resolve({ src, ok: true });
                            imagen.onerror = () => resolve({ src, ok: false });
                            imagen.src = src;
                        })
                )
            );

            if (cancelado) return;

            setImagenesOk(
                resultados
                    .filter((resultado) => resultado.ok)
                    .map((resultado) => resultado.src)
            );
            setCargando(false);
        }

        validarImagenes();

        return () => {
            cancelado = true;
        };
    }, [imagenesFinal]);

    function eliminarImagen(srcFallida) {
        setImagenesOk((imagenesPrevias) => {
            const imagenesValidas = imagenesPrevias.filter(
                (src) => src !== srcFallida
            );

            setActual((indiceActual) =>
                imagenesValidas.length
                    ? Math.min(indiceActual, imagenesValidas.length - 1)
                    : 0
            );
            return imagenesValidas;
        });
    }

    function siguiente() {
        if (imagenesOk.length <= 1) return;
        setActual((indiceActual) => (indiceActual + 1) % imagenesOk.length);
    }

    function anterior() {
        if (imagenesOk.length <= 1) return;
        setActual(
            (indiceActual) =>
                (indiceActual - 1 + imagenesOk.length) % imagenesOk.length
        );
    }

    if (cargando) {
        return (
            <div className="flex flex-col gap-3">
                <Skeleton className="aspect-[5/4] w-full rounded-2xl" />
                <div className="flex gap-2">
                    {[0, 1, 2].map((item) => (
                        <Skeleton key={item} className="size-16 rounded-xl sm:size-20" />
                    ))}
                </div>
            </div>
        );
    }

    if (!imagenesOk.length) {
        return (
            <div className="flex aspect-[5/4] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-muted/40 text-center">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-background text-muted-foreground shadow-sm">
                    <Images className="size-6" aria-hidden="true" />
                </div>
                <div>
                    <p className="text-sm font-bold text-foreground">
                        Imagen no disponible
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        Nuestro equipo puede enviarte fotografías por WhatsApp.
                    </p>
                </div>
            </div>
        );
    }

    const hayVariasImagenes = imagenesOk.length > 1;
    const imagenActual = imagenesOk[actual];

    return (
        <div className="flex w-full min-w-0 flex-col gap-3">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border border-border bg-background">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(15,23,42,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.7)_1px,transparent_1px)] [background-size:32px_32px]"
                    aria-hidden="true"
                />

                <img
                    src={imagenActual}
                    alt={`${tituloProducto}, imagen ${actual + 1}`}
                    fetchPriority={actual === 0 ? "high" : "auto"}
                    decoding="async"
                    className="relative size-full object-contain p-5 sm:p-8"
                    onError={() => eliminarImagen(imagenActual)}
                />

                <Badge className="absolute right-3 top-3 border-border bg-background/90 font-bold text-foreground shadow-sm backdrop-blur-md">
                    {actual + 1} / {imagenesOk.length}
                </Badge>

                {hayVariasImagenes ? (
                    <>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={anterior}
                            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 shadow-lg backdrop-blur-md"
                            aria-label="Ver imagen anterior"
                        >
                            <ChevronLeft data-icon="inline-start" />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={siguiente}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 shadow-lg backdrop-blur-md"
                            aria-label="Ver imagen siguiente"
                        >
                            <ChevronRight data-icon="inline-end" />
                        </Button>
                    </>
                ) : null}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
                {imagenesOk.map((imagen, indice) => (
                    <button
                        key={imagen}
                        type="button"
                        onClick={() => setActual(indice)}
                        className={cn(
                            "relative size-16 shrink-0 overflow-hidden rounded-xl border bg-background p-1.5 transition-[border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:size-20",
                            indice === actual
                                ? "border-primary shadow-[0_0_0_2px_color-mix(in_oklch,var(--primary)_18%,transparent)]"
                                : "border-border hover:-translate-y-0.5 hover:border-primary/40"
                        )}
                        aria-label={`Ver imagen ${indice + 1} de ${tituloProducto}`}
                        aria-current={indice === actual ? "true" : undefined}
                    >
                        <img
                            src={imagen}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="size-full rounded-lg object-contain"
                            onError={() => eliminarImagen(imagen)}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
