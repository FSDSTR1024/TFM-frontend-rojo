/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"
import { notify } from "/src/utils/notifications"

import { useState, useEffect } from "react"
import { WineCard } from "../../components/molecules/WineCard"
import { FilterBar } from "../../components/molecules/WineFilters"  

const logger = new Logger("WinesPage")

export const WinesPage = () => {
  
  const [wines, setWines] = useState([])
  const [filters, setFilters] = useState({ 
    name: "",
    type: "",
    region: "",
    winery: "",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    minRating: ""
  })

  const fetchWines = () => {
    logger.info("Fetching wines data...")

    const queryParams = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value)
    })

    fetch(`${import.meta.env.VITE_SERVER_URL}/wines?${queryParams.toString()}`) 
      .then((response) => response.json()) 
      .then((data) => {
        if (!data || !data.data) {
          logger.warn("No wine data received from API")
          notify.warning("No se han recibido datos de ningún vino.")
          return
        }

        const winesWithCorrectID = data.data.map(wine => ({
          ...wine,
          id: wine.id || wine._id 
        }))

        setWines(winesWithCorrectID)
        logger.info(`Loaded ${winesWithCorrectID.length} wines successfully`)
      })
      .catch((error) => {
        console.error("Error al obtener los vinos:", error)
        logger.error("Error fetching wines:", error)
      })
  }

  useEffect(() => {
    fetchWines()
  }, [filters]) 

  return (
    <section id="wines_page" className="container mx-auto px-4 min-h-screen flex flex-col items-start">
      <h1 className="text-center text-2xl font-bold my-6 w-full">Listado completo</h1>

      <div className="sm:flex sm:flex-col sm:gap-6 lg:hidden">
        <div>
          <FilterBar onFilterChange={setFilters} />
        </div>

        <div className="flex justify-start">
          <div className="w-full max-w-md flex flex-col gap-y-6 items-start">
            {wines.length > 0 ? (
              wines.map((wine) => <WineCard key={wine.id} wine={wine} />)
            ) : (
              <p className="text-left text-lg col-span-full">
                No hay vinos disponibles.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:justify-start gap-6 w-full">
        <div>
          <FilterBar onFilterChange={setFilters} />
        </div>

        <div className="lg:w-3/4 flex flex-col items-start gap-y-6 ml-auto">
          {wines.length > 0 ? (
            wines.map((wine) => (
              <div key={wine.id} className="w-full max-w-md">
                <WineCard wine={wine} />
              </div>
            ))
          ) : (
            <p className="text-left text-lg">No hay vinos disponibles.</p>
          )}
        </div>
      </div>
    </section>
  )
}
