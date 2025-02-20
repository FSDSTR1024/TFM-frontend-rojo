import { useState, useEffect } from "react"
import { WineCard } from "../../components/molecules/WineCard"

export const VinosPage = () => {
  
  const [wines, setWines] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/wines") 
      .then((response) => response.json()) 
      .then((data) => {
        const winesWithCorrectID = data.data.map(wine => ({
          ...wine,
          id: wine.id || wine._id // <-- Asegura que `id` exista
        }))
        setWines(winesWithCorrectID)
      })
      .catch((error) => console.error("Error fetching wines:", error))
  }, [])

  return (
    <section id="vinos_page" className="container mx-auto px-4">
      <h1 className="text-center text-2xl font-bold my-6">Listado completo</h1>
      
      {/* Tarjetas */}
      <div className="flex flex-col items-center gap-6">
        {wines.length > 0 ? (
          wines.map((wine) => (
            <div key={wine.id} className="w-full md:w-1/3">
              <WineCard wine={wine} />
            </div>
          ))
        ) : (
          <p className="text-center text-lg">No hay vinos disponibles.</p>
        )}
      </div>
    </section>
  )
}

export default VinosPage