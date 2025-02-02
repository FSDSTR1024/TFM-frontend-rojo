/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const RegisterField = ({ name, required=true, register, text, type="text", validate=undefined }) => {
  const logger = new Logger("FormField")

  const requiredFieldErrorMessage = "Este campo es necesario, por favor rellénalo."
  const requiredNonBlankTextMessage = "Este campo debe ser rellenado, almenos, por algún carácter que no sea un espacio."
  const validateNonBlankTextInTextField = (field_text) => {
    if (field_text.trim().length > 0) return true
    /* else */
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
        {...register(name, {
          required: { message: required?requiredFieldErrorMessage:undefined, value: required },
          validate: validate?validate:validateNonBlankTextInTextField
        })}
      />
    </div>
  )
}
