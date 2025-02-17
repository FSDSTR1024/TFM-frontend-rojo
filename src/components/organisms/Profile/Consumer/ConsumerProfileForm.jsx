/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { ProfileForm } from "/src/components/molecules/Profile/Form"

export const ConsumerProfileForm = ({ user, navigate }) => {
  const logger = new Logger("ConsumerProfileForm")
  const { setUser } = useContext(AuthContext) 

  const handleOnSubmit = async (formData) => {
    const isSameData = Object.keys(formData).every(key => formData[key] === user[key])

    if (isSameData) {
        alert("La información que intentas introducir es la misma que tu perfil actual.")
        return
    }

    try {
      logger.debug("Enviando datos al backend:", formData)

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/consumers/${user.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const jsonData = await response.json()
      logger.debug("Respuesta del backend:", jsonData)

      if (!response.ok) throw jsonData

      alert("[SUCCESS] Perfil actualizado correctamente!")

      setUser((prevUser) => ({ 
        ...prevUser, 
        ...formData,
        id: prevUser.id, 
        _id: prevUser._id 
      }))

      logger.info("Perfil actualizado con éxito")
      
      navigate("/")
    } catch (err) {
      logger.error("Error en la actualización del perfil:", err)
      alert(`[ERROR] ${err?.msg || "Error desconocido"}`)
    }
  }

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
    <ProfileForm
      formFields={formFields}
      formTitle="Editar Perfil de Consumidor"
      user={user}
      handleOnSubmit={handleOnSubmit}
    />
  )
}
