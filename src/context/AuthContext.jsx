import { createContext, useCallback, useEffect, useState } from "react"

export const AuthContext = createContext({
  setToken: () => {},
  setUser: () => {},
  user: null
})

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)

  const fetchUser = useCallback(async () => {
    if (!token) return; 

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const jsonData = await response.json()

      if (jsonData.error) {
        console.error("Error al obtener usuario:", jsonData.error)
        return 
      }

      setUser({ id: jsonData.data._id, ...jsonData.data })
    } catch (error) {
      console.error("Error en fetchUser:", error)
    }
  }, [token]) 

  useEffect(() => {
    fetchUser() 
  }, [fetchUser])

  return (
    <AuthContext.Provider value={{ setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
