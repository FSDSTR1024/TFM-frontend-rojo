/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

export const useDeleteAccount = () => {
  const logger = new Logger("useDeleteAccount")

  const deleteAccount = async (userId, role) => {
    if (!userId || !role) {
      logger.error("Error: Usuario o rol no definidos.")
      return { error: "Usuario o rol no válidos." }
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/users/${role}/${userId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })

      const jsonData = await response.json()

      if (!response.ok) throw new Error(jsonData.error || "Error desconocido al eliminar la cuenta")

      logger.info(`Cuenta eliminada correctamente: ID ${userId}`)
      return { success: true }
    } catch (error) {
      logger.error("Error al eliminar la cuenta:", error)
      return { error: error.message || "Error desconocido al eliminar la cuenta" }
    }
  }

  return { deleteAccount }
}
