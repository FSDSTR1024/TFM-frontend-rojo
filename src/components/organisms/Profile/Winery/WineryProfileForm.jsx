/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { ProfileForm } from "/src/components/molecules/Profile/Form"


export const WineryProfileForm = ({ user, navigate, logger }) => {
  const { setUser } = useContext(AuthContext) 

  const handleOnSubmit = async (formData) => {
    try {
      logger.debug("Enviando datos al backend:", formData) 

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/wineries/${user.id}`, {
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
    { name: "name", text: "Nombre" },
    { name: "description", text: "Descripción", required: false },
    { name: "location", text: "Ubicación (País)", type: "select", required: true },
    { name: "phone", text: "Teléfono", required: false, type: "phone" },
    { name: "web_page", text: "Página web", required: false, type: "url" },
  ]

  return (
    <ProfileForm
      formFields={formFields}
      formTitle="Editar Perfil de Bodega"
      user={user}
      handleOnSubmit={handleOnSubmit}
    />
  )
}
