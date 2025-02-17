import { useForm } from "react-hook-form"
import { useUpdatePassword } from "/src/hooks/useUpdatePassword"
import { useValidatePassword } from "/src/hooks/useValidatePassword"

import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"

import "./PasswordChangeForm.css"

export const PasswordChangeForm = ({ user, setUser,setShowPasswordForm }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const { updatePassword } = useUpdatePassword()
  const { validatePassword } = useValidatePassword()

  const handlePasswordChange = async (data) => {
    if (!user?.id || !user?.role) {
      alert("Error: Usuario no válido o rol indefinido.")
      return
    }

    if (data.new_password === data.current_password) {
      alert("La nueva contraseña no puede ser igual a la actual.")
      return
  }

    if (data.current_password !== user.password) {
      alert("La contraseña actual no coincide con la registrada.")
      return
    }

    if (data.new_password !== data.confirm_new_password) {
      alert("La nueva contraseña y su confirmación no coinciden.")
      return
    }

    try {
      const response = await updatePassword(user.id, user.role, data.current_password, data.new_password)
      if (response.error) {
        alert(`Error: ${response.error}`)
      } else {
        setUser({ ...user, password: data.new_password })
        alert("Contraseña actualizada correctamente.")
        setShowPasswordForm(false)
      }
    } catch (err) {
      console.error("Error al actualizar la contraseña:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(handlePasswordChange)} className="password_form">
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

      <button type="submit" className="password_form_button">Guardar Contraseña</button>
    </form>
  )
}
