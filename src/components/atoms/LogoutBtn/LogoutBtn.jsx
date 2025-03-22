/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { useLogout } from "/src/hooks/useLogout"

export const LogoutBtn = () => {
  const logger = new Logger("LogoutBtn")

  const { setToken } = useContext(AuthContext)
  const { logout } = useLogout()
  const navigate = useNavigate()

  const handleLogout = useCallback(() => {
    try {
      logout()
      setToken(null)
      logger.info("Usuario cerró sesión exitosamente.")
      notify.info("¡El usuario cerró la sesión con éxito!")
      if (window.location.pathname !== "/") navigate('/')
      window.location.reload()
    } catch (error) {
      logger.error("Error al cerrar sesión:", error)
      notify.error("Hubo un error al cerrar la sesión.")
    }
  }, [logout, setToken, navigate, logger])

  return (
    <button
      className="btn bg-wineapp-ligero text-white"
      onClick={handleLogout}
    >
      Cerrar Sesión
    </button>
  )
}
