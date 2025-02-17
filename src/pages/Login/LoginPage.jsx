import "./LoginPage.css"

/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

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
      alert("[SUCCESS] ¡El usuario ha iniciado sesión exitosamente!")
      navigate('/')
    }
    else {
      logger.error("User could not be logged in!", error)
      alert(`[ERROR] User could not be logged in!`)
    }
  }, [])

  return (
    <section id="login_page">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <UserCredentials
          formState={formState}
          register={register}
          section_id={"login_credentials"}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </section>
  )
}
