/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useValidatePassword = () => {
    const logger = new Logger("useValidatePassword")

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        if (passwordRegex.test(password)) return true
        const errorText =
            "La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula y un número."
        logger.error(errorText)
        return errorText
    }

    return { validatePassword }
}
