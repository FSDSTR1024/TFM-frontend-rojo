/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "/src/context/AuthContext"
import { useNavigate } from "react-router-dom"
import { WineForm } from "/src/components/organisms/Wine/WineForm"
import { useUpsertWine } from "/src/hooks/useUpsertWine"
import { WineCard } from "/src/components/molecules/WineCard"
import { Button } from "/src/components/atoms/Form"

export const WinesManagementPage = () => {
  const logger = new Logger("WinesManagementPage")
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [wines, setWines] = useState([])
  const [wineToEdit, setWineToEdit] = useState(null)
  const { deleteWine } = useUpsertWine()

  useEffect(() => {
    if (!user || user.role !== "wineries") {
      logger.warn("Acceso no autorizado a WinesManagementPage.")
      notify.warning("Acceso no autorizado.")
      navigate("/")
    } else {
      fetch(`${import.meta.env.VITE_SERVER_URL}/wines/winery/${user.id}`)
        .then((res) => res.json())
        .then((data) => setWines(data.data || []))
        .catch((error) => logger.error("Error fetching wines:", error))
    }
  }, [user, navigate])

  const handleDelete = async (wineId) => {
    const confirmed = confirm("¿Seguro deseas eliminar este vino?")
    if (confirmed) {
      const result = await deleteWine(wineId)
      if (result.error) {
        notify.error(result.error)
      } else {
        setWines((prevWines) => prevWines.filter((wine) => wine.id !== wineId && wine._id !== wineId))
        notify.info("Vino eliminado correctamente.")
      }
    }
  }

  const handleEdit = (wine) => {
    setWineToEdit({ ...wine, id: wine.id || wine._id })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCancelEdit = () => {
    setWineToEdit(null) 
  }

  return (
    <section className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Gestionar Vinos</h1>
      <WineForm wine={wineToEdit} onSuccess={() => window.location.reload()} onCancel={handleCancelEdit} />

      <div className="mt-6">
        {wines.length > 0 ? (
          [...wines] 
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((wine) => (
            <div key={wine.id || wine._id} className="mb-4">
              <WineCard
              wine={wine}
              showEditDelete={true}
              onEdit={() => handleEdit(wine)}
              onDelete={(wineId) => handleDelete(wineId)}
            />
          </div>
          ))
        ) : (
          <p className="text-center font-bold">No tienes vinos registrados aún.</p>
        )}
      </div>
    </section>
  )
}
