/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useEffect } from "react"

const logger = new Logger("AboutPage")

export const AboutPage = () => {
  useEffect(() => {
    logger.info("Página 'Sobre Nosotros' cargada correctamente.")
  }, []) 

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-[#9f2042]">Sobre Nosotros</h1>
      <p className="mt-4 text-gray-700 text-lg">
        Bienvenido a <span className="font-semibold">WineApp</span>, una comunidad apasionada por los vinos. 
        Nuestra misión es conectar a amantes del vino con bodegas y experiencias únicas.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[#7b0d1e]">Nuestro Equipo</h2>
        <div className="flex flex-wrap justify-center mt-4 gap-8">
          <div className="text-center">
            <p className="font-semibold mt-2">Jose Peanilla</p>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
          <div className="text-center">
            <p className="font-semibold mt-2">Nicolas Rende</p>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
          <div className="text-center">
            <p className="font-semibold mt-2">Maria Zamora</p>
            <p className="text-gray-600">Full Stack Developer</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-[#7b0d1e]">Contáctanos</h2>
        <p className="text-gray-600 mt-2">Si tienes preguntas o sugerencias, escríbenos a:</p>
        <p className="font-semibold text-[#9f2042]">contacto@wineapp.com</p>
      </div>
    </div>
  )
}
