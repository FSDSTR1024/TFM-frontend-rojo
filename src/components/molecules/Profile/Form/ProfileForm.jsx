import { useEffect } from "react"
import { useForm } from "react-hook-form"

import { FieldErrorP } from "/src/components/protons/FieldErrorP"
import { RegisterField } from "/src/components/atoms/Register/Field"
import { useValidatePhone } from "/src/hooks/useValidatePhone"

export const ProfileForm = ({ formFields, formTitle, user, handleOnSubmit }) => {
    const { formState, handleSubmit, register, setValue } = useForm()
    const { validatePhone } = useValidatePhone()

    useEffect(() => {
        if (user) {
            Object.keys(user).forEach(key => {
                if (!formState.dirtyFields[key]) {
                    setValue(key, user[key])
                }
            })
        }
    }, [user])

    return (
        <section id="profile_form">
            <h4>{formTitle}</h4>
            <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
                {formFields.map(({ name, text, required = true, type = "text" }) => (
                    <div key={name}>
                        <RegisterField
                            name={name}
                            text={text}
                            register={register}
                            required={required}
                            formState={formState}
                            validate={type === "phone" ? validatePhone : undefined} 
                            type={type} 
                        />
                        {formState.errors[name] && <FieldErrorP message={formState.errors[name].message} />}
                    </div>
                ))}
                <button type="submit">Guardar Cambios</button>
            </form>
        </section>
    )
}
