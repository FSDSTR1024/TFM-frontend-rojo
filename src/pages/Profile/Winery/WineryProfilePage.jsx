import "../ProfilePage.css"

/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { WineryProfileForm } from "/src/components/organisms/Profile/Winery"
import { EmailChangeForm } from "/src/components/molecules/Profile/Form/EmailChangeForm"

export const WineryProfilePage = () => {
  const logger = new Logger("WineryProfilePage")
  const { user, setToken, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [showEmailForm, setShowEmailForm] = useState(false)

  if (!user || user.role !== "wineries") return <h2>Cargando perfil...</h2>

  const toggleEmailForm = () => {
    setShowEmailForm((prev) => !prev)
  }

  return (
    <section id="profile_page">
      <h2>Editar perfil de bodega</h2>

      <WineryProfileForm
        user={user}
        setToken={setToken}
        navigate={navigate}
        logger={logger}
      />

      <button onClick={toggleEmailForm} style={{ marginTop: "1rem" }}>
        {showEmailForm ? "Cancelar" : "Modificar Email"}
      </button>

      {showEmailForm && (
        <>
          <h3>Actualizar Email</h3>
          <EmailChangeForm user={user} setUser={setUser} />
        </>
      )}
    </section>
  )
}
