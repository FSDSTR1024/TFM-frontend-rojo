/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useUpdatePassword = () => {
  const logger = new Logger("useUpdatePassword")

  const updatePassword = async (userId, role, currentPassword, newPassword) => {
    if (!userId || !newPassword || !currentPassword || !role) {
      logger.error("Faltan parámetros: userId, role, currentPassword o newPassword es undefined.")
      return { error: "Error: Datos de usuario, rol o contraseñas no definidos." }
    }

    if (role !== "consumers" && role !== "wineries") {
      logger.error(`Rol inválido: ${role}`);
      return { error: "Error: Rol de usuario no válido." }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${role}/${userId}/password`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          current_value: currentPassword,
          new_value: newPassword,
          confirm_new_value: newPassword
         })
      })

      const jsonData = await response.json()
      if (!response.ok) throw jsonData

      logger.info(`Contraseña actualizada correctamente para el usuario ${userId} con rol ${role}`)
      return { data: jsonData }
    } catch (error) {
      logger.error("Error en la solicitud de actualización de contraseña:", error)
      return { error: error.message || "Error desconocido al actualizar la contraseña" }
    }
  }

  return { updatePassword }
}
