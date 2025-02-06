import { useForm } from "react-hook-form"
import { useUpdatePassword } from "/src/hooks/useUpdatePassword"

import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"

import "./PasswordChangeForm.css"

export const PasswordChangeForm = ({ user, setUser }) => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { updatePassword } = useUpdatePassword()

    const handlePasswordChange = async (data) => {
        if (!user?.id || !user?.role) {
            alert("Error: Usuario no válido o rol indefinido.")
            return
        }

        try {
            const response = await updatePassword(user.id, user.role, data.password)
            if (response.error) {
                alert(`Error: ${response.error}`)
            } else {
                alert("Contraseña actualizada correctamente.")
            }
        } catch (err) {
            console.error("Error al actualizar la contraseña:", err)
        }
    }

    return (
        <form onSubmit={handleSubmit(handlePasswordChange)} className="password_form">
            <h3 className="password_form_title">Actualizar Contraseña</h3>
            <div>
                <RegisterField
                    name="password"
                    text="Nueva Contraseña"
                    type="password"
                    required={true}
                    register={register}                   
                    validate={(value) => value.length >= 6 || "La contraseña debe tener al menos 6 caracteres"}
                />
                <FieldErrorP error={errors.password} />
            </div>
            <button type="submit" className="password_form_button">Guardar Contraseña</button>
        </form>
    )
} 
    