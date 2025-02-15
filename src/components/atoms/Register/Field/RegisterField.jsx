/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useValidateEmail } from "/src/hooks/useValidateEmail"

export const RegisterField = ({ name, required = true, register = () => {}, text, type = "text", validate }) => {
  const logger = new Logger("RegisterField")
  const { validateEmail } = useValidateEmail()

  const requiredFieldErrorMessage = "Este campo es necesario, por favor rellénalo."
  const requiredNonBlankTextMessage = "Este campo debe ser rellenado, al menos, por algún carácter que no sea un espacio."

  const validateNonBlankTextInTextField = (field_text) => {
    if (field_text.trim().length > 0) return true;
    logger.error(`${requiredNonBlankTextMessage}`)
    return requiredNonBlankTextMessage
  }

  const fieldId = `field-${name}`

  return (
    <div>
      <label htmlFor={fieldId}>{text}:</label>
      <input
        id={fieldId}
        name={name}
        type={type}
        {...(typeof register === "function"
          ? register(name, {
              required: required ? { message: requiredFieldErrorMessage, value: true } : undefined,
              validate: type === "email" ? validateEmail : (required ? validateNonBlankTextInTextField : undefined),
            })
          : {})}
      />
    </div>
  )
}
