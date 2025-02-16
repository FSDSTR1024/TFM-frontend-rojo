/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useValidatePhone = () => {
    const logger = new Logger("useValidatePhone")

    const validatePhone = (phone) => {
        if (!phone) {
            const emptyErrorText = "Debes introducir un número de teléfono válido.";
            logger.error(emptyErrorText);
            return emptyErrorText;
        }
        const phoneRegex = /^\+?[0-9.]{7,18}$/
        if (phoneRegex.test(phone)) return true
        const errorText = "El número de teléfono solo debe contener números o los carácteres especiales ('+' o '.') y debe tener entre 7 y 15 digitos, sin espacios ni guiones."
        logger.error(errorText)
        return errorText
    }

    return { validatePhone }
}
