/************************************************** Internal logger ***************************************************/
import { Logger } from '/src/utils/Logger.jsx'
import { useEffect } from 'react'
import { useSocket } from '/src/context/SocketContext'
import { toast } from 'react-toastify'
import { notify } from "/src/utils/notifications"

const logger = new Logger("SocketNotifications")

export const SocketNotifications = ({ user }) => {
  const socket = useSocket()

  useEffect(() => {
    if (!socket || !user || user.role !== "wineries") return

     // Únete a la sala correspondiente para la bodega
     socket.emit("join-winery-room", user.id)
     logger.info(`Usuario bodega con ID ${user.id} se unió a su sala.`)

    // Escucha el evento "new-review" que emite el backend
    socket.on("new-review", (data) => {
      logger.info("Nueva review recibida:", data)
      notify.info(`¡Nueva valoración para "${data.wine.name}"!`)
    })

    // Limpieza: remueve el listener cuando el componente se desmonte
    return () => {
      socket.off("new-review")
    }
  }, [socket, user])

  return null
}
