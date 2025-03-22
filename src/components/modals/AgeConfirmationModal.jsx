/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React, { useEffect } from "react"

const logger = new Logger("AgeConfirmationModal")

export const AgeConfirmationModal = ({ onConfirm }) => {

  useEffect(() => {
    logger.info("Modal de verificación de edad mostrado")
  }, [])

  const handleConfirm = (isAdult) => {
    logger.info(`Usuario seleccionó: ${isAdult ? "Sí, soy mayor" : "No, no soy mayor"}`)
    if (isAdult) {
      sessionStorage.setItem("isAdult", "true")
    }
    onConfirm(isAdult)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-[#3d1308] text-[#f8e5ee] p-6 rounded-xl shadow-xl max-w-sm mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-[#9f2042] text-center">
          Verificación de Edad
        </h2>
        <p className="mb-6 text-[#f8e5ee] text-center">
          ¿Eres mayor de 18 años?
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <button
            onClick={() => handleConfirm(true)}
            className="bg-[#059669] hover:bg-[#047857] text-white px-6 py-3 rounded-lg transition-all shadow-lg min-w-[140px]"
          >
            Sí, soy mayor
          </button>
          <button
            onClick={() => handleConfirm(false)}
            className="bg-[#DC2626] hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg min-w-[140px]"
          >
            No, no soy mayor
          </button>
        </div>
      </div>
    </div>
  )
}
