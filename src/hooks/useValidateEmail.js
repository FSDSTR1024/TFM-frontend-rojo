/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useValidateEmail = () => {
    const logger = new Logger("useValidateEmail")

   const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(email)) return true
    logger.error("El correo electrónico debe tener un formato válido y un dominio. Ejemplo: 2s7Q4@example.com")
    return "El correo electrónico debe tener un formato válido y un dominio. Ejemplo: 2s7Q4@example.com"
  }

  return { validateEmail } 
}
