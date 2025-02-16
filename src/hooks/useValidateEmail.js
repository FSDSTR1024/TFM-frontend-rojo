/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useValidateEmail = () => {
    const logger = new Logger("useValidateEmail")

   const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailRegex.test(email)) return true
    logger.error("El formato del correo electrónico no es válido.")
    return "El formato del correo electrónico no es válido."
  }

  return { validateEmail } 
}
