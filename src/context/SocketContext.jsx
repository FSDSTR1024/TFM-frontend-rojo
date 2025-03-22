/************************************************** Internal logger ***************************************************/
import { Logger } from '/src/utils/Logger.jsx'
// src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const logger = new Logger("SocketContext")

// Crea el contexto
const SocketContext = createContext()

// Proveedor del contexto que inicializa el socket
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    logger.info("Inicializando conexión de Socket.io...")
    // Inicializa el socket usando la URL del servidor (usando tu variable de entorno)
    const newSocket = io(import.meta.env.VITE_SERVER_URL, {
      transports: ['websocket'], // opcional, para forzar WebSocket
    })

    newSocket.on("connect", () => {
      logger.info(`Socket conectado: ${newSocket.id}`)
    })

    newSocket.on("connect_error", (error) => {
      logger.error("Error de conexión de socket:", error)
    })

    setSocket(newSocket)

    // Limpieza: cierra la conexión cuando se desmonte el proveedor
    return () => {
      logger.info("Cerrando conexión de Socket.io...")
      newSocket.close()
    }
  }, [])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}

// Hook para acceder fácilmente al socket
export const useSocket = () => {
  return useContext(SocketContext)
}
