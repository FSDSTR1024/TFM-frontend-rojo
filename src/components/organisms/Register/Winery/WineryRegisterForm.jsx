/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

import { RegisterForm } from "/src/components/molecules/Register/Form"
import { notify } from "/src/utils/notifications"

export const WineryRegisterForm = () => {
  const logger = new Logger("WineryRegisterForm")
  const navigate = useNavigate()

  const handleOnSubmit = useCallback(async (formsData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/wineries`, {
        body: JSON.stringify(formsData),
        headers: { 'Content-Type': 'application/json' },
        method: "POST"
      })
      const jsonData = await response.json()
      if (!response.ok) throw jsonData
      logger.debug("Winery user created successfully, with ID:", jsonData.data)
      notify.success("¡Usuario bodega creado exitosamente!")
      navigate('/')
    } catch (err) {
      logger.error("Winery user could not be created!", err.error)
      notify.error("No ha sido posible crear el usuario.")
      let errorMessage = err.error
      if (errorMessage.includes("already registered")) {
        errorMessage = "La bodega que intentas registrar ya se encuentra registrada en la base de datos."
      } else {
        errorMessage = "Ha ocurrido un error al registrar la bodega."
      }
      notify.success(`${errorMessage}`)
    }
  }, [])

  const formFields = [
    { /* Name */
      name: "name",
      text: "Nombre",
      required: true
    },
    { /* Description */
      name: "description",
      required: false,
      text: "Descripción"
    },
    { /* Phone */
      name: "phone",
      required: false,
      text: "Teléfono",
      type: "phone"
    },
    { /* Webpage */
      name: "web_page",
      text: "Página web",
      required: false,
      type: "url"
    },
    { /* Location */
      name: "location",
      text: "Localización (País)",
      required: true,
      type: "select"
    }
  ]
  return (
    <RegisterForm
      formFields={formFields}
      formTitle="Showing NEW Winery User Form"
      handleOnSubmit={handleOnSubmit}
    />
  )
}
