/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { FormContainer, Button } from "/src/components/atoms/Form"
import { notify } from "/src/utils/notifications"

const logger = new Logger("ContactPage")

export const ContactPage = () => {
  useEffect(() => {
    logger.info("Página de contacto cargada correctamente.")
  }, []) 

  const { register, handleSubmit, formState: { errors }, setError } = useForm()

  const onSubmit = (data) => {
    if (Object.keys(errors).length > 0) {
      logger.warn("Intento de envío con errores:", errors)
      notify.warning("Intento de envío con errores:", errors)
      return
    }
    logger.info("Formulario de contacto enviado con:", data)
    notify.success("¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.")
  }

  return (
    <section className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-[#9f2042]">Contáctanos</h2>
      <p className="text-center text-gray-700 mt-2">
        ¿Tienes alguna duda o sugerencia? Envíanos un mensaje y te responderemos lo antes posible.
      </p>

      <FormContainer onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div>
          <label className="block font-medium">Nombre</label>
          <input
            {...register("name", { required: "Este campo es obligatorio" })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Tu nombre"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Correo Electrónico</label>
          <input
            type="email"
            {...register("email", { required: "Correo requerido", pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" } })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Mensaje</label>
          <textarea
            {...register("message", { required: "Por favor escribe tu mensaje" })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Escribe tu mensaje aquí..."
            rows="4"
          ></textarea>
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
        </div>

        <Button type="submit" variant="moderado" className="w-full">Enviar Mensaje</Button>
      </FormContainer>

      {/* Información de contacto */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-semibold text-[#9f2042]">Información de Contacto</h3>
        <p className="text-gray-600 mt-2">📍 Dirección: Calle del Vino, 123, Barcelona, España</p>
        <p className="text-gray-600">📧 Email: <a href="mailto:contacto@wineapp.com" className="text-[#9f2042] hover:underline">contacto@wineapp.com</a></p>
        <p className="text-gray-600">📞 Teléfono: +34 600 123 456</p>

        {/* Redes Sociales */}
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://www.instagram.com/thekeyofwineok" target="_blank" rel="noopener noreferrer" className="hover:underline">📷 Instagram</a>
          <a href="https://twitter.com/wineapp" target="_blank" rel="noopener noreferrer" className="hover:underline">🐦 Twitter</a>
        </div>
      </div>
    </section>
  )
}
