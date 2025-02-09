import "../ProfilePage.css"

/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { ConsumerProfileForm } from "/src/components/organisms/Profile/Consumer"
import { EmailChangeForm } from "/src/components/molecules/Profile/Form/EmailChangeForm"
import { PasswordChangeForm } from "/src/components/molecules/Profile/Form/PasswordChangeForm"

export const ConsumerProfilePage = () => {
  const logger = new Logger("ConsumerProfilePage")
  const { user, setToken, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [showEmailForm, setShowEmailForm] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  if (!user || user.role !== "consumers") return <h2>Cargando perfil...</h2>

  const toggleEmailForm = () => {
    setShowEmailForm((prev) => !prev)
  }

  const togglePasswordForm = () => {
    setShowPasswordForm((prev) => !prev)
  }

  return (
    <section id="profile_page">
      <h2>Editar perfil de consumidor</h2>

      <ConsumerProfileForm
        user={user}
        setToken={setToken}
        navigate={navigate}
        logger={logger}
      />

      <button onClick={toggleEmailForm} style={{ marginTop: "1rem" }}>
        {showEmailForm ? "Cancelar" : "Modificar Email"}
      </button>

      {showEmailForm && (
          <EmailChangeForm user={user} setUser={setUser} setShowEmailForm={setShowEmailForm} />
      )}

      <button onClick={togglePasswordForm} style={{ marginTop: "1rem" }}>
        {showPasswordForm ? "Cancelar" : "Modificar Contraseña"}
      </button>

      {showPasswordForm && (
          <PasswordChangeForm user={user} setUser={setUser} setShowPasswordForm={setShowPasswordForm} />
      )}
    </section>
  )
}
