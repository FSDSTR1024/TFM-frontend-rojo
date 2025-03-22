/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

import { useDeleteAccount } from "/src/hooks/useDeleteAccount"
import { useContext } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { Button } from "/src/components/atoms/Form"

export const DeleteAccountBtn = () => {
  const logger = new Logger("DeleteAccountBtn")
  
  const { user, setToken, setUser } = useContext(AuthContext)
  const { deleteAccount } = useDeleteAccount()
  const navigate = useNavigate()

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")
    if (!confirmDelete) {
      logger.info("Usuario canceló la eliminación de cuenta.")
      notify.info("Usuario canceló la eliminación de cuenta.")
      return
    }

    logger.info("Usuario confirmó la eliminación de cuenta.")
    notify.info("Usuario confirmó la eliminación de cuenta.")
    
    const result = await deleteAccount(user.id, user.role)
    
    if (result.success) {
      logger.info(`Cuenta eliminada exitosamente para usuario ID: ${user.id}`)
      notify.info("Cuenta eliminada exitosamente.")
      localStorage.removeItem("token")
      setToken(null)
      setUser(null)
      navigate("/")
      window.location.reload()
    } else {
      logger.error(`Error al eliminar cuenta para usuario ID: ${user.id}`, result.error)
      notify.error(`Error: ${result.error}`)
    }
  }

  return (
    <Button 
      onClick={handleDeleteAccount} 
      variant="eliminar"
      style={{
        marginTop: "2rem"
      }}
    >
      Eliminar Cuenta
    </Button>
  )
}
