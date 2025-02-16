/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useValidateWebsite = () => {
    const logger = new Logger("useValidateWebsite")

    const validateWebsite = (url) => {
        if (!url) return true 
        const websiteRegex = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\S*)?$/
        if (websiteRegex.test(url)) return true
        const errorText = "Debe ser una URL válida (ejemplo: https://example.com)"
        logger.error(errorText)
        return errorText
    }

    return { validateWebsite }
}
