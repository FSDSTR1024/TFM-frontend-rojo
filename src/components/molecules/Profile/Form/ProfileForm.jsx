import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { FieldErrorP } from "/src/components/protons/FieldErrorP";
import { RegisterField } from "/src/components/atoms/Register/Field";

export const ProfileForm = ({ formFields, formTitle, user, handleOnSubmit }) => {
    const { formState, handleSubmit, register, setValue } = useForm()

    useEffect(() => {
      if (user) {
          Object.keys(user).forEach(key => {
              if (!formState.dirtyFields[key]) {
                  setValue(key, user[key]);
              }
          });
      }
  }, [user]);

    return (
        <section id="profile_form">
          <h4>{formTitle}</h4>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            {formFields.map(({ name, text, required = true }) => (
              <div key={name}>
                <RegisterField name={name} text={text} register={register} required={required} />
                <FieldErrorP error={formState.errors[name]} />
              </div>
            ))}
            <button type="submit">Guardar Cambios</button>
          </form>
        </section>
      )
    }
    