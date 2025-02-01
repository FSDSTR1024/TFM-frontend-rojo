import "../ProfilePage.css"

/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

import { useContext } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContext } from "/src/context/AuthContext"
import { WineryProfileForm } from "/src/components/molecules/Profile/WineryProfileForm"

export const WineryProfilePage = () => {
    const logger = new Logger("WineryProfilePage")
    const { user, setToken } = useContext(AuthContext)
    const navigate = useNavigate()

    if (!user || user.role !== "wineries") return <h2>Cargando perfil...</h2>

    return (
        <section id="profile_page">
            <h2>Editar perfil de bodega</h2>
            <WineryProfileForm user={user} setToken={setToken} navigate={navigate} logger={logger} />
        </section>
    )
}