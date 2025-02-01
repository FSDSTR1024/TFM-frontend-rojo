import { ProfileForm } from "/src/components/molecules/Profile/Form"

export const WineryProfileForm = ({ user, setToken, navigate, logger }) => {
  const handleOnSubmit = async (formData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/wineries/${user.id}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const jsonData = await response.json()
      if (!response.ok) throw jsonData

      alert("[SUCCESS] Perfil actualizado correctamente!")
      navigate("/")
    } catch (err) {
      logger.error(err.msg, err.error)
      alert(`[ERROR] ${err.msg}`)
    }
  }

  const formFields = [
    { name: "name", text: "Nombre" },
    { name: "description", text: "Descripción", required: false },
    { name: "location", text: "Ubicación" },
    { name: "phone", text: "Teléfono", required: false },
    { name: "web_page", text: "Página web", required: false }
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
