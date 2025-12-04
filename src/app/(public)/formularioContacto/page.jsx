"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Ingresa un correo válido"),
    subject: z.string().min(4, "El título debe ser más descriptivo"),
    message: z.string().min(10, "Escribe un mensaje más completo"),
});

export default function FormularioContacto() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit(values) {
        console.log("Valores enviados:", values);
    }

    return (
        <section className="w-full bg-white text-gray-900 py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* --- LADO IZQUIERDO (Texto comercial) --- */}
                <div className="space-y-6">
                    <p className="text-sm uppercase tracking-widest text-sky-600">
                        Contacto especializado
                    </p>

                    <h1 className="text-3xl md:text-4xl font-semibold text-sky-800">
                        Cuéntanos qué necesitas o cómo podemos ayudarte.
                    </h1>

                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                        Nuestro equipo revisa cada consulta de forma personalizada.
                        Trabajamos con repuestos para vehículos Maxus y soluciones para
                        flotas industriales y mineras en todo Chile.
                    </p>

                    <ul className="space-y-2 text-gray-700 text-sm md:text-base">
                        <li>• ¿Buscas un repuesto específico?</li>
                        <li>• ¿Quieres cotizar exportación de alguna pieza?</li>
                        <li>• ¿Necesitas soporte, reclamos o sugerencias?</li>
                    </ul>

                    <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700 shadow-sm">
                        Completa el formulario y te responderemos lo antes posible.
                    </div>
                </div>

                {/* --- FORMULARIO --- */}
                <div>
                    <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 md:p-8">
                        <h2 className="text-2xl font-semibold text-sky-800 mb-2">
                            Enviar consulta
                        </h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Escríbenos y cuéntanos tu caso. Te ayudaremos con rapidez.
                        </p>

                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                {/* Nombre */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Nombre completo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ej: Juan Pérez"
                                                    {...field}
                                                    className="bg-white border-gray-300 focus-visible:ring-sky-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Correo electrónico</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="email"
                                                    placeholder="correo@ejemplo.com"
                                                    {...field}
                                                    className="bg-white border-gray-300 focus-visible:ring-sky-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Asunto */}
                                <FormField
                                    control={form.control}
                                    name="subject"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Título del correo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ej: Cotización repuesto Maxus T60"
                                                    {...field}
                                                    className="bg-white border-gray-300 focus-visible:ring-sky-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Mensaje */}
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-gray-700">Mensaje</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Cuéntanos qué repuesto necesitas, modelo del vehículo, año, etc."
                                                    rows={5}
                                                    {...field}
                                                    className="bg-white border-gray-300 focus-visible:ring-sky-500 resize-none"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Botón */}
                                <Button
                                    type="submit"
                                    className="w-full mt-2 bg-sky-600 hover:bg-sky-500 text-white font-medium rounded-xl tracking-wide shadow-md"
                                >
                                    Enviar consulta
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
}