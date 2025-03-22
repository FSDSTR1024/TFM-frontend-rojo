/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { RegisterForm } from "/src/components/molecules/Register/Form"
import { notify } from "/src/utils/notifications"

export const ConsumerRegisterForm = () => {
  const logger = new Logger("ConsumerRegisterForm")
  const navigate = useNavigate()

  const handleOnSubmit = useCallback(async (formsData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/consumers`, {
        body: JSON.stringify(formsData),
        headers: { 'Content-Type': 'application/json' },
        method: "POST"
      })
      const jsonData = await response.json()
      if (!response.ok) throw jsonData
      logger.debug("Consumer user created successfully, with ID:", jsonData.data)
      notify.success("¡Usuario consumidor creado exitosamente!")
      navigate('/login')
    } catch (err) {
      logger.error("Consumer user could not be created!", err.error)
      notify.error("No ha sido posible crear el usuario.")
      let errorMessage = err.error
      if (errorMessage.includes("already registered")) {
        errorMessage = "El usuario consumidor que intentas registrar ya se encuentra registrado en la base de datos."
      } else {
        errorMessage = "Ha ocurrido un error al registrar el usuario."
      }
      notify.success(`${errorMessage}`)
    }
  }, [])

  const formFields = [
    { /* Name */
      name: "name",
      text: "Nombre"
    },
    { /* Surname */
      name: "surname",
      text: "Apellidos"
    },
    { /* Address */ 
      name: "address", 
      text: "Dirección", 
      required: false 
    },
    { /* City */ 
      name: "city", 
      text: "Ciudad", 
      required: false
    },
    { /* Country */
      name: "country",
      text: "País",
      type: "select"
   }
  ]
  return (
    <RegisterForm
      formFields={formFields}
      formTitle="Showing NEW Consumer User Form"
      handleOnSubmit={handleOnSubmit}
    />
  )
}
