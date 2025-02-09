import { useForm } from "react-hook-form"
import { useUpdateEmail } from "/src/hooks/useUpdateEmail"

import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"

import "./EmailChangeForm.css"

export const EmailChangeForm = ({ user, setUser }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { updateEmail } = useUpdateEmail()

  const handleEmailChange = async (data) => {
    if (!user?.id || !user?.role) {
      console.error("Error: Usuario no válido o rol indefinido.", user)
      alert("Error: Usuario no válido o rol indefinido.")
      return
    }

    if (data.current_email !== user.email) {
      alert("El email actual no coincide con el registrado.")
      return
    }

    if (data.new_email !== data.confirm_new_email) {
      alert("El nuevo email y su confirmación no coinciden.")
      return
    }

    try {
      const response = await updateEmail(user.id, user.role, data.current_email, data.new_email || "")
      if (response.error) {
        alert(`Error: ${response.error}`)
      } else {
        setUser({ ...user, email: data.new_email })
        alert("Email actualizado correctamente.")
      }
    } catch (err) {
      console.error("Error al actualizar el email:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleEmailChange)} className="email_form">
      <h3 className="email_form_title">Actualizar Email</h3>
      <div>
        <RegisterField
          name="current_email"
          text="Email Actual"
          type="email"
          register={register}
          required={true}
        />
        {errors.current_email && <FieldErrorP error={errors.current_email} />}
        <RegisterField
          name="new_email"
          text="Nuevo Email"
          type="email"
          register={register}
          required={true}
        />
        {errors.new_email && <FieldErrorP error={errors.new_email} />}
        <RegisterField
          name="confirm_new_email"
          text="Confirmar Nuevo Email"
          type="email"
          register={register}
          required={true}
        />
        {errors.confirm_new_email && <FieldErrorP error={errors.confirm_new_email} />}
      </div>
      <button type="submit" className="email_form_button">Guardar Email</button>
    </form>
  )
}
