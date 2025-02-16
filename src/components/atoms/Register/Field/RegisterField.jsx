/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useValidateEmail } from "/src/hooks/useValidateEmail"
import { useValidatePhone } from "/src/hooks/useValidatePhone"
import { useValidatePassword } from "/src/hooks/useValidatePassword"
import { america, europa } from "/src/utils/countries"

export const RegisterField = ({ name, required = true, register = () => {}, text, type = "text", validate }) => {
  const logger = new Logger("RegisterField")
  const { validateEmail } = useValidateEmail()
  const { validatePhone } = useValidatePhone()
  const { validatePassword } = useValidatePassword()

  const requiredFieldErrorMessage = "Este campo es necesario, por favor rellénalo."
  const requiredNonBlankTextMessage = "Este campo debe ser rellenado, al menos, por algún carácter que no sea un espacio."

  const validateNonBlankTextInTextField = (field_text) => {
    if (field_text.trim().length > 0) return true;
    logger.error(`${requiredNonBlankTextMessage}`)
    return requiredNonBlankTextMessage
  }

  const getValidationFunction = () => {
    if (type === "email") return validateEmail
    if (type === "phone") return validatePhone
    if (type === "password") return validatePassword
    return required ? validateNonBlankTextInTextField : undefined
  }

  const fieldId = `field-${name}`

  return (
    <div>
      <label htmlFor={fieldId}>{text}:</label>
      {type === "select" ? (
        <select id={fieldId} name={name} {...register(name, {
          required: required ? { message: "Debes seleccionar un país.", value: true } : undefined
        })}
        defaultValue="" 
      >
        <option value="">Selecciona un país</option>

        {/* Grupo: América */}
        <optgroup label="🌎 América">
          {america.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </optgroup>

        {/* Grupo: Europa */}
        <optgroup label="🌍 Europa">
          {europa.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </optgroup>

      </select>
      ) : (
      <input
        id={fieldId}
        name={name}
        type={type}
        {...(typeof register === "function"
          ? register(name, {
              required: required ? { message: requiredFieldErrorMessage, value: true } : undefined,
              validate: getValidationFunction(),
            })
          : {})}
          onInvalid={(e) => {
            if (type === "email") {
              e.target.setCustomValidity("El formato del correo no es válido. Debe contener '@' y un dominio.");
            } else if (type === "phone") {
              e.target.setCustomValidity("El número de teléfono solo debe contener números o carácteres especiales y tener entre 7 y 15 dígitos.");
            }
          }}
          onInput={(e) => e.target.setCustomValidity("")} 
      />
      )}
    </div>
  )
}
