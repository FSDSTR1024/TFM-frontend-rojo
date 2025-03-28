/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import React from "react"

const logger = new Logger("Button")

export const Button = ({ children, className, variant = "primary", ...props }) => {
  const baseStyles = "rounded-md py-2 px-4 transition-colors duration-300"
  
  const variants = {
    muyFuerte: "bg-[#211103] hover:bg-[#3d1308] text-white",
    fuerte: "bg-[#3d1308] hover:bg-[#7b0d1e] text-white",
    moderado: "bg-[#7b0d1e] hover:bg-[#9f2042] text-white",
    ligero: "bg-[#9f2042] hover:bg-[#f8e5ee] text-white",
    muyLigero: "bg-[#f8e5ee] hover:bg-[#9f2042] text-black",
    eliminar: "bg-red-600 hover:bg-red-700 text-white",
  }

  const handleClick = (event) => {
    logger.info(`Botón "${children}" clickeado. Variante: ${variant}`)
    if (props.onClick) {
      props.onClick(event)
    }
  }

  logger.debug(`Renderizando botón con variante: ${variant}`)

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
