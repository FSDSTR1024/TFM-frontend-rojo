import "../ProfilePage.css"

/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { ConsumerProfileForm } from "/src/components/organisms/Profile/Consumer"

export const ConsumerProfilePage = () => {
  const logger = new Logger("ConsumerProfilePage")
  const { user, setToken } = useContext(AuthContext)
  const navigate = useNavigate()

  if (!user || user.role !== "consumers") return <h2>Cargando perfil...</h2>

  return (
    <section id="profile_page">
      <h2>Editar perfil de consumidor</h2>
      <ConsumerProfileForm user={user} setToken={setToken} navigate={navigate} logger={logger} />
    </section>
  )
}