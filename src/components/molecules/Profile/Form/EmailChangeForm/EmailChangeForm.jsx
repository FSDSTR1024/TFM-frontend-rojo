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
      alert("Error: Usuario no válido o rol indefinido.")
      return
    }

    try {
      const response = await updateEmail(user.id, user.role, data.email)
      if (response.error) {
        alert(`Error: ${response.error}`)
      } else {
        setUser({ ...user, email: data.email })
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
          name="email"
          text="Nuevo Email"
          type="email"
          required={true}
          register={register}
        />
        {errors.email && <FieldErrorP error={errors.email} />}
      </div>
      <button type="submit" className="email_form_button">Guardar Email</button>
    </form>
  )
}
