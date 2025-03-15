/************************************************** Internal logger ***************************************************/
import { Logger } from "/src/utils/Logger.jsx"

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

    fetch(`http://localhost:3000/wines?${queryParams.toString()}`) 
      .then((response) => response.json()) 
      .then((data) => {
        if (!data || !data.data) {
          logger.warn("No wine data received from API")
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
    <section id="wines_page" className="container mx-auto px-4">
      <h1 className="text-center text-2xl font-bold my-6">Listado completo</h1>

      <div className="grid grid-cols-4 gap-6">
        
        <div>
          <FilterBar onFilterChange={setFilters} />
        </div>

        <div className="flex justify-center">
          <div className="w-3/4 grid grid-cols-1 gap-y-10 place-items-center">
            {wines.length > 0 ? (
              wines.map((wine) => <WineCard key={wine.id} wine={wine} />)
            ) : (
              <p className="text-center text-lg col-span-full">
                No hay vinos disponibles.
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
