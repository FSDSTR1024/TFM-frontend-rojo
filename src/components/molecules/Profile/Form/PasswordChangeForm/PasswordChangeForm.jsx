/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { useForm } from "react-hook-form"
import { useUpdatePassword } from "/src/hooks/useUpdatePassword"
import { useValidatePassword } from "/src/hooks/useValidatePassword"
import { notify } from "/src/utils/notifications"

import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { FormContainer, Button } from "/src/components/atoms/Form"

export const PasswordChangeForm = ({ user, setUser, setShowPasswordForm }) => {
  const logger = new Logger("PasswordChangeForm")

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { updatePassword } = useUpdatePassword()
  const { validatePassword } = useValidatePassword()

  const handlePasswordChange = async (data) => {
    logger.info("Formulario de cambio de contraseña enviado.", data)

    if (!user?.id || !user?.role) {
      logger.error("Usuario no válido o rol indefinido.", user)
      notify.error("Error: Usuario no válido o rol indefinido.")
      return
    }

    if (data.new_password === data.current_password) {
      logger.warn("Intento de cambiar a una contraseña idéntica a la actual.")
      notify.warning("La nueva contraseña no puede ser igual a la actual.")
      return
    }

    if (data.current_password !== user.password) {
      logger.warn("Contraseña actual proporcionada no coincide con la registrada.")
      notify.warning("La contraseña actual no coincide con la registrada.")
      return
    }

    if (data.new_password !== data.confirm_new_password) {
      logger.warn("La nueva contraseña y su confirmación no coinciden.")
      notify.warning("La nueva contraseña y su confirmación no coinciden.")
      return
    }

    try {
      const response = await updatePassword(user.id, user.role, data.current_password, data.new_password)
      if (response.error) {
        logger.error("Error al actualizar la contraseña:", response.error)
        notify.error(`Error: ${response.error}`)
      } else {
        setUser({ ...user, password: data.new_password })
        logger.info("Contraseña actualizada correctamente.")
        notify.info("Contraseña actualizada correctamente.")
        setShowPasswordForm(false)
      }
    } catch (err) {
      logger.error("Error inesperado al actualizar la contraseña:", err)
      notify.error("Error inesperado al actualizar la contraseña.")
    }
  }

  const onError = (errors) => {
    logger.error("Errores de validación en el formulario de cambio de contraseña:", errors)
    const firstError = Object.values(errors)[0]
    const message = firstError?.message || "Error de validación"
    notify.warning(message)
  }

  return (
    <FormContainer onSubmit={handleSubmit(handlePasswordChange, onError)} className="password_form">
      <h3 className="password_form_title">Actualizar Contraseña</h3>

      <RegisterField
        name="current_password"
        text="Contraseña Actual"
        type="password"
        register={register}
        required={true}
      />
      {errors.current_password && <FieldErrorP error={errors.current_password} />}

      <RegisterField
        name="new_password"
        text="Nueva Contraseña"
        type="password"
        register={register}
        required={true}
        validate={(value) => validatePassword(value)}
      />
      {errors.new_password && <FieldErrorP error={errors.new_password} />}

      <RegisterField
        name="confirm_new_password"
        text="Confirmar Nueva Contraseña"
        type="password"
        register={register}
        required={true}
      />
      {errors.confirm_new_password && <FieldErrorP error={errors.confirm_new_password} />}

      <Button variant="moderado" type="submit" className="password_form_button">Guardar Contraseña</Button>
    </FormContainer>
  )
}
