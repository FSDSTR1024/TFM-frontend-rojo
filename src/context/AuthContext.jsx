import { createContext, useCallback, useEffect, useState } from "react"

export const AuthContext = createContext({
  setToken: () => "Out of context",
  user: {
    email: "Out of context",
    id: "Out of context",
    name: "Out of context",
    password: "Out of context"
    // and other params, depending on kind...
  }
})

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [user, setUser] = useState(null)

  const fetchUser = useCallback(async () => {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const jsonData = await response.json()
    if (jsonData.error) return null
    else {
      setUser({ id: jsonData.data._id, ...jsonData.data })
    }
  })

  useEffect(() => {
    if (token) fetchUser()
  }, [token])

  return (
    <AuthContext.Provider value={{ setToken, user }}>
      {children}
    </AuthContext.Provider>
  )
}
