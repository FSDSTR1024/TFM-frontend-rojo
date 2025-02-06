import "../ProfilePage.css"

/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { ConsumerProfileForm } from "/src/components/organisms/Profile/Consumer"
import { EmailChangeForm } from "/src/components/molecules/Profile/Form/EmailChangeForm"

export const ConsumerProfilePage = () => {
  const logger = new Logger("ConsumerProfilePage")
  const { user, setToken, setUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [showEmailForm, setShowEmailForm] = useState(false)

  if (!user || user.role !== "consumers") return <h2>Cargando perfil...</h2>

  const toggleEmailForm = () => {
    setShowEmailForm((prev) => !prev)
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
          <EmailChangeForm user={user} setUser={setUser} />
      )}
    </section>
  )
}
