/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useForm } from "react-hook-form"
import { useUpdateEmail } from "/src/hooks/useUpdateEmail"
import { useValidateEmail } from "/src/hooks/useValidateEmail"
import { notify } from "/src/utils/notifications"

import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { FormContainer, Button } from "/src/components/atoms/Form"

export const EmailChangeForm = ({ user, setUser, setShowEmailForm }) => {
  const logger = new Logger("EmailChangeForm")

  const { register, handleSubmit, formState, watch } = useForm() 
  const { updateEmail } = useUpdateEmail()
  const { validateEmail } = useValidateEmail()

  const handleEmailChange = async (data) => {
    logger.info("Formulario de cambio de email enviado.", data)

    if (!user?.id || !user?.role) {
      logger.error("Usuario no válido o rol indefinido.", user)
      notify.error("Error: Usuario no válido o rol indefinido.")
      return
    }

    if (data.new_email === user.email) {
      logger.warn("Intento de cambiar email al mismo email actual.")
      notify.warning("La información que intentas introducir es la misma que tu perfil actual.")
      return
    }

    if (data.current_email !== user.email) {
      logger.warn("Email actual proporcionado no coincide con el registrado.")
      notify.warning("El email actual no coincide con el registrado.")
      return
    }

    if (data.new_email !== data.confirm_new_email) {
      logger.warn("Nuevo email y su confirmación no coinciden.")
      notify.warning("El nuevo email y su confirmación no coinciden.", warn)
      return
    }

    try {
      const response = await updateEmail(user.id, user.role, data.current_email, data.new_email || "")
      if (response.error) {
        logger.error("Error al actualizar el email:", response.error)
        notify.error(`Error: ${response.error}`)
      } else {
        setUser({ ...user, email: data.new_email })
        logger.info("Email actualizado correctamente.")
        notify.info("Email actualizado correctamente.")
        setShowEmailForm(false)
      }
    } catch (err) {
      logger.error("Error inesperado al actualizar el email:", err)
      notify.error("Error inesperado al actualizar el email.", err)
    }
  }

  const onError = (errors) => {
    logger.error("Errores de validación en el formulario de cambio de email:", errors)
    const firstError = Object.values(errors)[0]
    const message = firstError?.message || "Error de validación"
    notify.warning(message)
  }

  return (
    <FormContainer onSubmit={handleSubmit(handleEmailChange, onError)} noValidate className="email_form">
      <h3 className="email_form_title">Actualizar Email</h3>
      <div>
        <RegisterField
          name="current_email"
          text="Email Actual"
          type="email"
          register={register}
          required={true}
          validate={validateEmail}
          formState={formState} 
        />

        <RegisterField
          name="new_email"
          text="Nuevo Email"
          type="email"
          register={register}
          required={true}
          validate={validateEmail}
          formState={formState} 
        />

        <RegisterField
          name="confirm_new_email"
          text="Confirmar Nuevo Email"
          type="email"
          register={register}
          required={true}
          validate={(value) => value === watch("new_email") || "Los emails no coinciden"}
          formState={formState} 
        />
      </div>
      <Button variant="moderado" type="submit" className="email_form_button">Guardar Email</Button>
    </FormContainer>
  )
}
