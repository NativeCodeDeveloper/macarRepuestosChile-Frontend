"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import {
  BadgeCheck,
  FileSpreadsheet,
  Mail,
  PackageSearch,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";
import ToasterClient from "@/Componentes/ToasterClient";

function formatCurrency(value) {
  return `$ ${Number(value || 0).toLocaleString("es-CL")}`;
}

function buildQuoteNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const time = String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0");
  return `COT-${year}${month}${day}-${time}`;
}

export default function CotizacionesVentaPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const CLOUDFLARE_HASH = process.env.NEXT_PUBLIC_CLOUDFLARE_HASH;

  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [quoteNumber] = useState(buildQuoteNumber);
  const [cliente, setCliente] = useState({
    nombre: "",
    rut: "",
    correo: "",
    observaciones: "",
  });
  const [seleccionados, setSeleccionados] = useState([]);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  function cfToSrc(imageId, variant = "card") {
    if (!imageId || !CLOUDFLARE_HASH) return "";
    return `https://imagedelivery.net/${CLOUDFLARE_HASH}/${imageId}/${variant}`;
  }

  async function listarProductos() {
    try {
      setIsLoading(true);
      const res = await fetch(`${API}/producto/seleccionarProducto`, {
        method: "GET",
        headers: { Accept: "application/json" },
        mode: "cors",
      });

      if (!res.ok) {
        toast.error("No fue posible cargar los productos para cotizar.");
        setProductos([]);
        return;
      }

      const data = await res.json();
      const productosArray = Array.isArray(data)
        ? data
        : Array.isArray(data?.productos)
          ? data.productos
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setProductos(productosArray);
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema al cargar el listado de productos.");
      setProductos([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listarProductos();
  }, []);

  const productosFiltrados = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return productos;
    return productos.filter((producto) =>
      String(producto.tituloProducto || "").toLowerCase().includes(term)
    );
  }, [productos, search]);

  const subtotal = useMemo(
    () =>
      seleccionados.reduce(
        (acc, item) => acc + Number(item.valorProducto || 0) * Number(item.cantidad || 1),
        0
      ),
    [seleccionados]
  );

  const totalItems = useMemo(
    () => seleccionados.reduce((acc, item) => acc + Number(item.cantidad || 1), 0),
    [seleccionados]
  );

  function handleClienteChange(field, value) {
    setCliente((prev) => ({ ...prev, [field]: value }));
  }

  function agregarProducto(producto) {
    setSeleccionados((prev) => {
      const existente = prev.find((item) => item.id_producto === producto.id_producto);
      if (existente) {
        return prev.map((item) =>
          item.id_producto === producto.id_producto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          id_producto: producto.id_producto,
          tituloProducto: producto.tituloProducto,
          valorProducto: Number(producto.valorProducto || 0),
          cantidad: 1,
          imagenProducto: producto.imagenProducto,
        },
      ];
    });

    toast.success("Producto agregado a la cotización.");
  }

  function actualizarCantidad(idProducto, cantidad) {
    const cantidadNormalizada = Math.max(1, Number(cantidad || 1));
    setSeleccionados((prev) =>
      prev.map((item) =>
        item.id_producto === idProducto ? { ...item, cantidad: cantidadNormalizada } : item
      )
    );
  }

  function eliminarProducto(idProducto) {
    setSeleccionados((prev) => prev.filter((item) => item.id_producto !== idProducto));
  }

  function limpiarCotizacion() {
    setCliente({
      nombre: "",
      rut: "",
      correo: "",
      observaciones: "",
    });
    setSeleccionados([]);
    setSearch("");
    toast.success("Cotización reiniciada.");
  }

  async function imageUrlToDataUrl(url) {
    const response = await fetch(url);
    const blob = await response.blob();

    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function generarPdfCotizacion() {
    if (!cliente.nombre || !cliente.rut || !cliente.correo) {
      toast.error("Completa nombre, RUT y correo antes de generar el PDF.");
      return;
    }

    if (seleccionados.length === 0) {
      toast.error("Agrega al menos un producto antes de generar el PDF.");
      return;
    }

    try {
      setIsGeneratingPdf(true);

      const [{ jsPDF }, { default: autoTable }] = await Promise.all([
        import("jspdf"),
        import("jspdf-autotable"),
      ]);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 14;
      const logoDataUrl = await imageUrlToDataUrl("/logoBlack2.png");

      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, pageWidth, 34, "F");
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 34, pageWidth, 3, "F");

      doc.addImage(logoDataUrl, "PNG", margin, 8, 56, 18);

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Cotizacion Comercial", pageWidth - margin, 15, { align: "right" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`N° ${quoteNumber}`, pageWidth - margin, 22, { align: "right" });
      doc.text(`${new Date().toLocaleDateString("es-CL")}`, pageWidth - margin, 27, {
        align: "right",
      });

      let cursorY = 47;

      doc.setTextColor(15, 23, 42);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Datos del cliente", margin, cursorY);

      cursorY += 7;
      doc.setDrawColor(226, 232, 240);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(margin, cursorY - 2, pageWidth - margin * 2, 30, 4, 4, "FD");

      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("Nombre:", margin + 4, cursorY + 5);
      doc.text("RUT:", margin + 4, cursorY + 12);
      doc.text("Correo:", margin + 4, cursorY + 19);

      doc.setFont("helvetica", "normal");
      doc.text(cliente.nombre, margin + 24, cursorY + 5);
      doc.text(cliente.rut, margin + 24, cursorY + 12);
      doc.text(cliente.correo, margin + 24, cursorY + 19);

      cursorY += 36;

      if (cliente.observaciones?.trim()) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Observaciones", margin, cursorY);
        cursorY += 6;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        const observaciones = doc.splitTextToSize(cliente.observaciones, pageWidth - margin * 2 - 8);
        const observacionesHeight = Math.max(14, observaciones.length * 5 + 6);
        doc.roundedRect(margin, cursorY - 1, pageWidth - margin * 2, observacionesHeight, 4, 4);
        doc.text(observaciones, margin + 4, cursorY + 5);
        cursorY += observacionesHeight + 8;
      }

      autoTable(doc, {
        startY: cursorY,
        margin: { left: margin, right: margin },
        head: [["Producto", "Cantidad", "Valor unitario", "Subtotal"]],
        body: seleccionados.map((item) => [
          item.tituloProducto,
          String(item.cantidad),
          formatCurrency(item.valorProducto),
          formatCurrency(item.valorProducto * item.cantidad),
        ]),
        styles: {
          fontSize: 9,
          cellPadding: 3.5,
          textColor: [51, 65, 85],
          lineColor: [226, 232, 240],
          lineWidth: 0.2,
        },
        headStyles: {
          fillColor: [37, 99, 235],
          textColor: [255, 255, 255],
          fontStyle: "bold",
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252],
        },
        bodyStyles: {
          valign: "middle",
        },
      });

      const finalY = doc.lastAutoTable.finalY + 8;

      doc.setFillColor(15, 23, 42);
      doc.roundedRect(pageWidth - 78, finalY, 64, 26, 4, 4, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text("Total de unidades", pageWidth - 70, finalY + 8);
      doc.text(String(totalItems), pageWidth - 20, finalY + 8, { align: "right" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("Subtotal cotizado", pageWidth - 70, finalY + 18);
      doc.text(formatCurrency(subtotal), pageWidth - 20, finalY + 18, { align: "right" });

      doc.setTextColor(100, 116, 139);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(
        "Documento generado desde el panel de cotizaciones de Macar Repuestos.",
        margin,
        pageHeight - 10
      );

      doc.save(`cotizacion-${quoteNumber}.pdf`);
      toast.success("PDF generado correctamente.");
    } catch (error) {
      console.error(error);
      toast.error("No fue posible generar el PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f8fc_0%,#eef4fb_45%,#f8fafc_100%)] text-slate-900">
      <ToasterClient />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <header className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,#0f172a_0%,#172033_45%,#1e3a8a_100%)] px-6 py-8 text-white shadow-[0_20px_80px_rgba(15,23,42,0.18)] sm:px-8 lg:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_26%)]" />

          <div className="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/80 backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4 text-blue-200" />
                Generador de cotizaciones
              </div>

              <div className="mt-6">
                <Image
                  src="/logoBlack2.png"
                  alt="Macar Repuestos"
                  width={620}
                  height={300}
                  priority
                  className="h-auto w-[220px] sm:w-[300px] lg:w-[360px]"
                />
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                Cotizaciones ejecutivas
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/78 sm:text-base">
                Crea cotizaciones claras para clientes, selecciona productos desde el catálogo y
                deja una presentación profesional alineada con la imagen comercial de Macar
                Repuestos.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 xl:min-w-[440px]">
              <StatCard label="Cotización" value={quoteNumber} />
              <StatCard label="Productos" value={String(totalItems)} />
              <StatCard label="Subtotal" value={formatCurrency(subtotal)} />
            </div>
          </div>
        </header>

        <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-8">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:p-6">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">
                    Datos del cliente
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Completa la información base para la cotización comercial.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                  <UserRound className="h-3.5 w-3.5 text-blue-600" />
                  Formulario comercial
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field
                  label="Nombre / razón social"
                  value={cliente.nombre}
                  onChange={(value) => handleClienteChange("nombre", value)}
                  placeholder="Ej: Transportes Pérez SpA"
                />
                <Field
                  label="RUT"
                  value={cliente.rut}
                  onChange={(value) => handleClienteChange("rut", value)}
                  placeholder="Ej: 12.345.678-9"
                />
                <div className="md:col-span-2">
                  <Field
                    label="Correo electrónico"
                    value={cliente.correo}
                    onChange={(value) => handleClienteChange("correo", value)}
                    placeholder="cliente@empresa.cl"
                    type="email"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Observaciones
                  </label>
                  <textarea
                    value={cliente.observaciones}
                    onChange={(event) => handleClienteChange("observaciones", event.target.value)}
                    placeholder="Notas internas, plazos, condiciones o detalles de despacho..."
                    className="min-h-28 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.06)] sm:p-6">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-950">
                    Selección de productos
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Busca repuestos y agrégalos a la cotización con un clic.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                  <PackageSearch className="h-3.5 w-3.5" />
                  Catálogo disponible
                </div>
              </div>

              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Buscar por nombre de producto..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="mt-5 max-h-[36rem] space-y-3 overflow-y-auto pr-1">
                {isLoading ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                    Cargando productos...
                  </div>
                ) : productosFiltrados.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                    No se encontraron productos con ese criterio.
                  </div>
                ) : (
                  productosFiltrados.map((producto) => (
                    <article
                      key={producto.id_producto}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 transition hover:border-blue-200 hover:shadow-md sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4 sm:flex-1">
                        <div className="h-20 w-20 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                          {producto.imagenProducto ? (
                            <img
                              src={cfToSrc(producto.imagenProducto, "mini")}
                              alt={producto.tituloProducto}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-slate-100 text-xs text-slate-400">
                              Sin imagen
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Repuesto
                          </p>
                          <h3 className="mt-1 line-clamp-2 text-sm font-bold text-slate-900 sm:text-base">
                            {producto.tituloProducto}
                          </h3>
                          <div className="mt-3 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                            {formatCurrency(producto.valorProducto)}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => agregarProducto(producto)}
                        className="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-600 hover:text-white"
                      >
                        Agregar a cotización
                      </button>
                    </article>
                  ))
                )}
              </div>
            </div>
          </section>

          <aside className="xl:sticky xl:top-24 xl:self-start">
            <div className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
              <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)] px-6 py-5 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/65">
                      Vista previa
                    </p>
                    <h2 className="mt-1 text-xl font-bold">Cotización comercial</h2>
                  </div>
                  <FileSpreadsheet className="h-6 w-6 text-blue-100" />
                </div>
              </div>

              <div className="space-y-6 px-6 py-6">
                <div className="flex items-start justify-between gap-4">
                  <Image
                    src="/logoBlack2.png"
                    alt="Macar Repuestos"
                    width={320}
                    height={150}
                    className="h-auto w-[170px]"
                  />
                  <div className="text-right text-xs text-slate-500">
                    <p className="font-semibold text-slate-700">N° {quoteNumber}</p>
                    <p>{new Date().toLocaleDateString("es-CL")}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <Mail className="h-4 w-4 text-blue-600" />
                    Datos del cliente
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <p><span className="font-semibold text-slate-800">Nombre:</span> {cliente.nombre || "Pendiente"}</p>
                    <p><span className="font-semibold text-slate-800">RUT:</span> {cliente.rut || "Pendiente"}</p>
                    <p className="break-words"><span className="font-semibold text-slate-800">Correo:</span> {cliente.correo || "Pendiente"}</p>
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">
                      Productos cotizados
                    </h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {seleccionados.length} seleccionados
                    </span>
                  </div>

                  <div className="space-y-3">
                    {seleccionados.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                        Aún no agregas productos a la cotización.
                      </div>
                    ) : (
                      seleccionados.map((item) => (
                        <div
                          key={item.id_producto}
                          className="rounded-2xl border border-slate-200 bg-white p-4"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h4 className="line-clamp-2 text-sm font-bold text-slate-900">
                                {item.tituloProducto}
                              </h4>
                              <p className="mt-1 text-xs text-slate-500">
                                Valor unitario: {formatCurrency(item.valorProducto)}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => eliminarProducto(item.id_producto)}
                              className="rounded-xl border border-slate-200 p-2 text-slate-400 transition hover:border-red-200 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <label className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                                Cantidad
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={item.cantidad}
                                onChange={(event) =>
                                  actualizarCantidad(item.id_producto, event.target.value)
                                }
                                className="w-20 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
                              />
                            </div>

                            <div className="text-right">
                              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                                Subtotal
                              </p>
                              <p className="text-sm font-extrabold text-slate-900">
                                {formatCurrency(item.valorProducto * item.cantidad)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>Total de unidades</span>
                    <span className="font-bold text-slate-900">{totalItems}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-base">
                    <span className="font-semibold text-slate-700">Subtotal cotizado</span>
                    <span className="text-2xl font-black tracking-[-0.04em] text-slate-950">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={generarPdfCotizacion}
                    disabled={isGeneratingPdf}
                    className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#1d4ed8_0%,#2563eb_55%,#38bdf8_100%)] px-5 py-3 text-sm font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_16px_30px_rgba(37,99,235,0.28)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isGeneratingPdf ? "Generando PDF..." : "Generar PDF"}
                  </button>
                  <button
                    type="button"
                    onClick={limpiarCotizacion}
                    className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Limpiar
                  </button>
                </div>

                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-3 text-xs leading-6 text-slate-500">
                  Esta vista está pensada para preparar cotizaciones comerciales rápidas. Puedes
                  imprimirla o usarla como base para el envío al cliente.
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-[1.4rem] border border-white/12 bg-white/10 px-4 py-4 backdrop-blur-sm">
      <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
        {label}
      </div>
      <div className="mt-2 text-lg font-black tracking-[-0.03em] text-white">{value}</div>
    </div>
  );
}
