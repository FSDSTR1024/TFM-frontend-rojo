/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

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
    logout()
    setToken(null)
    logger.debug("User logged out successfully!")
    alert("[SUCCESS] ¡El usuario cerró la sesión con éxito!")
    if (window.location !== "/") navigate('/')
    window.location.reload()
  }, [])

  return <button className="logout_button" onClick={handleLogout}>Cerrar Sesión</button>
}
