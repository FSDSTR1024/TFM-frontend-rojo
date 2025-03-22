/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

import { FormContainer, Button } from "/src/components/atoms/Form"
import { useEffect, useCallback, useContext } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { UserCredentials } from "/src/components/atoms/Register/Credentials"

import { useLogin } from "/src/hooks/useLogin"

export const LoginPage = () => {
  const logger = new Logger("LoginPage")

  const { user,setToken } = useContext(AuthContext)
  const { formState, handleSubmit, register } = useForm()
  const { login } = useLogin()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate("/") 
    }
  }, [user, navigate])

  const handleOnSubmit = useCallback(async (formsData) => {
    const { error } = await login(formsData)
    if (!error) {
      setToken(localStorage.getItem("token"))
      logger.debug("User logged in successfully!")
      notify.success("¡El usuario ha iniciado sesión exitosamente!")
      navigate('/')
    }
    else {
      logger.error("Error en el inicio de sesión:", error)
      notify.error(`${error || "No se pudo iniciar sesión. Verifique sus credenciales e inténtelo de nuevo."}`)
    }
  }, [])

  return (
    <section id="login_page">
      <h2 className="text-center text-xl font-bold mb-4">Iniciar Sesión</h2>
      
      <FormContainer onSubmit={handleSubmit(handleOnSubmit)}>
        <UserCredentials
          formState={formState}
          register={register}
          section_id={"login_credentials"}
        />
        <Button variant="ligero" type="submit">
          Iniciar Sesión
        </Button>
      </FormContainer>
    </section>
  )
}
