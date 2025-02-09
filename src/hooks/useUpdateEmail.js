/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useUpdateEmail = () => {
  const logger = new Logger("useUpdateEmail")

  const updateEmail = async (userId, role, currentEmail, newEmail) => {
    if (!userId || !newEmail || !currentEmail || !role) {
      logger.error("Faltan parámetros: userId, role, currentEmail o newEmail es undefined.")
      return { error: "Error: Datos de usuario, rol o email no definidos." }
    }

    if (role !== "consumers" && role !== "wineries") {
      logger.error(`Rol inválido: ${role}`);
      return { error: "Error: Rol de usuario no válido." }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${role}/${userId}/email`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          current_value: currentEmail,
          new_value: newEmail,
          confirm_new_value: newEmail
         })
      })
      const jsonData = await response.json()
      if (!response.ok) throw jsonData

      logger.info(`Email actualizado correctamente para el usuario ${userId} con rol ${role}`)
      return { data: jsonData }
    } catch (error) {
      logger.error("Error en la solicitud de actualización de email:", error)
      return { error: error.message || "Error desconocido al actualizar el email" }
    }
  }

  return { updateEmail }
}
