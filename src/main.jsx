import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "/src/App.jsx"
import { AuthProvider } from "/src/context/AuthContext"
import { SocketProvider } from '/src/context/SocketContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </StrictMode>
)
